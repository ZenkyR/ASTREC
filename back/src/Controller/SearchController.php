<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Category;
use App\Entity\UnderCategory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    #[Route('/search/{query}', name: 'search')]
    public function index(EntityManagerInterface $entityManager, $query): Response
    {
        $articleRepository = $entityManager->getRepository(Article::class);
        $articles = $articleRepository->createQueryBuilder('a')
            ->where('a.title LIKE :query')
            ->setParameter('query', '%' . $query . '%')
            ->getQuery()
            ->getResult();

        $categoryRepository = $entityManager->getRepository(Category::class);
        $categories = $categoryRepository->createQueryBuilder('c')
            ->where('c.name LIKE :query')
            ->setParameter('query', '%' . $query . '%')
            ->getQuery()
            ->getResult();

        $underCategoryRepository = $entityManager->getRepository(UnderCategory::class);
        $underCategories = $underCategoryRepository->createQueryBuilder('uc')
            ->where('uc.name LIKE :query')
            ->setParameter('query', '%' . $query . '%')
            ->getQuery()
            ->getResult();

        $result = [];

        if (empty($articles) && empty($categories) && empty($underCategories)) {
            return new Response(0);
        }

        foreach ($articles as $article) {
            $imgPath = [];

            foreach ($article->getImg() as $img) {
                $imgPath[] = $img->getUrl();
            }

            $result[] = [
                'id' => $article->getId(),
                'title' => $article->getTitle(),
                'price' => $article->getPrice(),
                'description' => $article->getDescription(),
                'stock' => $article->getStock(),
                'createdAt' => $article->getCreatedAt(),
                'img' => $imgPath,
            ];
        }

        /*  foreach ($categories as $category) {
            $result[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'img' => $category->getImg()->getUrl(),
            ];
        }

        foreach ($underCategories as $underCategory) {
            $result[] = [
                'id' => $underCategory->getId(),
                'name' => $underCategory->getName(),
                'img' => $underCategory->getImg()->getUrl(),
            ];
        } */

        return new JsonResponse($result);
    }
}
