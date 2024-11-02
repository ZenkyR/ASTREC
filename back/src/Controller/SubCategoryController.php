<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\UnderCategory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SubCategoryController extends AbstractController
{
    #[Route('/sub/category/{id}', name: 'app_sub_category')]
    public function index(EntityManagerInterface $entityManager, int $id): Response
    {
        $subCat = $entityManager->getRepository(Category::class)->find($id)->getUnderCategories();
        $subCat_name = [];

        foreach ($subCat as $value) {
            $subCat_name[] = ['id' => $value->getId(), 'name' => $value->getName(), 'img' => $value->getImg()->getUrl()];
        }

        if (!$subCat) {
            throw $this->createNotFoundException(
                'pas de sous categorie trouvé'
            );
        }
        return new JsonResponse($subCat_name);
    }

    #[Route('/subCategory/{id}', name: 'app_sub_category_by_id')]
    public function SubCategoryById(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $subCategory = $entityManager->getRepository(UnderCategory::class)->find($id);
        
        if (!$subCategory) {
            throw $this->createNotFoundException(
                'pas de sous categorie trouvé'
            );
        }
        $subCategory = [
            'id' => $subCategory->getId(),
            'name' => $subCategory->getName(),
        ];


        return new JsonResponse($subCategory);
    }
}
