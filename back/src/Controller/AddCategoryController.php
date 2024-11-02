<?php

namespace App\Controller;
use App\Entity\Category;
use App\Entity\ImgCategory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AddCategoryController extends AbstractController
{
    #[Route('/add/category', name: 'app_add_category')]
    public function add_category(EntityManagerInterface $entityManager, Request $request): Response
    {
        $imgPaths = [];
        $imgFile = $request->files->get('file');

        $imgName = uniqid() . '.' . $imgFile->guessExtension();
        $imgFile->move(
            $this->getParameter('kernel.project_dir') . '/public/images',
            $imgName
        );
        $http = $request->getScheme() . '://';
        $domain = $_SERVER['HTTP_HOST'];
        $imgPath = $http . $domain . '/images/' . $imgName;
        $imgPaths[] = $imgPath;

        $data = $request->request;

        $category = new Category();
        $category->setName($data->get('title'));
        $category->setImg($category->getId());

        foreach ($imgPaths as $imgPath) {
            $imgCategory = new ImgCategory();
            $imgCategory->setUrl($imgPath);
            $category->setImg($imgCategory);

            $entityManager->persist($imgCategory);
        }

        $entityManager->persist($category);
        $entityManager->flush();

        return new Response(1);
    }
}
