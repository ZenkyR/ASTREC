<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Article;

class DetailController extends AbstractController
{
    #[Route('/detail/{id}', name: 'app_detail')]
    public function show(EntityManagerInterface $entityManager, int $id): Response
    {
        $po = $entityManager->getRepository(Article::class)->find($id);
        $view = $po->getView();
        $view = $view + 1;
        $po->setView($view);

        $entityManager->persist($po);
        $entityManager->flush();

        $imagePaths = [];
        foreach ($po->getImg() as $img) {
            $imagePaths[] = $img->getUrl();
        }
        $ficheBisCollection = $po->getFiche()->getFicheBis();

        $ficheBisData = [];
        foreach ($ficheBisCollection as $ficheBis) {
            $ficheBisData[] = [
                'name' => $ficheBis->getName(),
                'value' => $ficheBis->getValue(),
            ];
        }

        $subCats = $po->getUnderCategories();

        $subCatData = [];

        foreach ($subCats as $subCat) {
            $subCatData[] = [
                'id' => $subCat->getId(),
                'name' => $subCat->getName()
            ];
        }
        
        $pa = [
            'id' => $po->getId(),
            'name' => $po->getTitle(),
            'category' => [
                'id' => $po->getCategory()->getId(),
                'name' => $po->getCategory()->getName(),
            ],
            'img' => $imagePaths,
            'desc' => $po->getDescription(),
            'price' => $po->getPrice(),
            'marque' => $po->getFiche()->getMarque(),
            'color' => $po->getFiche()->getColor(),
            'size' => $po->getFiche()->getSize(),
            'weight' => $po->getFiche()->getWeight(),
            'bis' => $ficheBisData,
            'sub_category' => $subCatData,
            'stock' => $po->getStock(),
            'view' => $po->getView()
        ];

        return new JsonResponse($pa);
    }
}
