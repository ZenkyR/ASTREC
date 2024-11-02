<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\UnderCategory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class CategoryController extends AbstractController
{
    #[Route('/category', name: 'app_category')]
    public function index(EntityManagerInterface $entityManager, Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        if(!isset($parameters['search'])) {
            $parameters['search'] = "";
        }

        $categoryRepository = $entityManager->getRepository(Category::class);
        $category = $categoryRepository->createQueryBuilder('category')
            ->where('category.name LIKE :query')
            ->setParameter('query', '%' . $parameters['search'] . '%')
            ->getQuery()
            ->getResult();
        $category_name = [];

        foreach ($category as $value) {
            
            $subCats = $value->getUnderCategories();

            $subCatData = [];
            foreach ($subCats as $subCat) {
                $subCatData[] = [
                    'id' => $subCat->getId(),
                    'name' => $subCat->getName()
                ];
            }

                        $category_name[] = ['id' => $value->getId(),
                                'name' => $value->getName(),
                                'img' => $value->getImg()->getUrl(),
                                'subCat' => $subCatData
                               ];
        }  

        return new JsonResponse($category_name);
    }

    #[Route('/category/{id}', name: 'category_by_id', methods: ['GET'])]
    public function CategoryId(EntityManagerInterface $entityManager, $id): JsonResponse
    {
        $category = $entityManager->getRepository(Category::class)->find($id);

        if (!$category) {
            throw $this->createNotFoundException(
                'Category not found.'
            );
        }

        $categoryData = [
            'id' => $category->getId(),
            'name' => $category->getName(),
            'img' => $category->getImg()->getUrl()
        ];

        return new JsonResponse($categoryData);
    }

    #[Route('/subCategory/{id}', name: 'sub_category_by_id', methods: ['GET'])]
    public function subCategory(EntityManagerInterface $entityManager, int $id): Response
    {
        $subCat = $entityManager->getRepository(UnderCategory::class)->find($id);

        $subCat_name = [
            'id' => $subCat->getId(),
            'name' => $subCat->getName(),
            'img' => $subCat->getImg()->getUrl()
        ];

        if (!$subCat) {
            throw $this->createNotFoundException(
                'pas de sous categorie trouvé'
            );
        }
        return new JsonResponse($subCat_name);
    }

    #[Route('/category/delete/{id}', name: 'app_category_delete_cat')]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $category = $entityManager->getRepository(Category::class)->find($id);
        $images = $category->getImg();

        foreach ($images as $image) {
            if ($image->getUrl() == null) {
                continue;
            } else {
                $url = $image->getUrl();
                $url = str_replace('http://127.0.0.1:8000', realpath(__DIR__ . '/../../public'), $url);

                if (file_exists($url)) {
                    unlink($url);
                }
            }
        }

        $entityManager->remove($category);
        $entityManager->flush();

        return new Response('Catégorie supprimé');
    }

    #[Route('/subCategory/delete/{id}', name: 'app_category_delete')]
    public function subdelete(EntityManagerInterface $entityManager, int $id): Response
    {
        $subCategory = $entityManager->getRepository(UnderCategory::class)->find($id);
        $images = $subCategory->getImg();

        foreach ($images as $image) {
            if ($image->getUrl() == null) {
                continue;
            } else {
                $url = $image->getUrl();
                $url = str_replace('http://127.0.0.1:8000', realpath(__DIR__ . '/../../public'), $url);

                if (file_exists($url)) {
                    unlink($url);
                }
            }
        }

        $category = $subCategory->getCategory();
        $category->removeUnderCategory($subCategory);

        $entityManager->flush();

        return new Response('sous category supprimé');
    }

    #[Route('/category/modif/{id}', name: 'app_category_modif')]
    public function modif(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $img = $request->files->get('img');

        if ($img) {
            $imgName = uniqid() . '.' . $img->guessExtension();
            $img->move(
                $this->getParameter('kernel.project_dir') . '/public/images',
                $imgName
            );
            $http = $request->getScheme() . '://';
            $domain = $_SERVER['HTTP_HOST'];
            $imgPath = $http . $domain . '/images/' . $imgName;
        }

        $data = $request->request;

        $category = $entityManager->getRepository(Category::class)->find($id);
        $category->setName($data->get('name'));

        if ($img) {
            $category->getImg()->setUrl($imgPath);
        }

        $entityManager->persist($category);
        $entityManager->flush();

        return new Response('Catégorie modifié');
    }

    #[Route('/subCategory/modif/{id}', name: 'app_sub_category_modif')]
    public function subModif(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $img = $request->files->get('img');

        if ($img) {
            $imgName = uniqid() . '.' . $img->guessExtension();
            $img->move(
                $this->getParameter('kernel.project_dir') . '/public/images',
                $imgName
            );
            $http = $request->getScheme() . '://';
            $domain = $_SERVER['HTTP_HOST'];
            $imgPath = $http . $domain . '/images/' . $imgName;
        }

        $data = $request->request;

        $subCategory = $entityManager->getRepository(UnderCategory::class)->find($id);
        $subCategory->setName($data->get('name'));

        if ($img) {
            $subCategory->getImg()->setUrl($imgPath);
        }

        $entityManager->persist($subCategory);
        $entityManager->flush();

        return new Response('sous Catégorie modifié');
    }
}
