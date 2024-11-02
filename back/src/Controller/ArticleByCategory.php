<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ArticleByCategory extends AbstractController
{
    #[Route('/article/category/{id}', name: 'app_article_by_category')]
    public function ArticleByCategory(EntityManagerInterface $entityManager, int $id): Response
    {
        $sql = "SELECT article.id, category_id, title, description, price, stock, GROUP_CONCAT(img.url SEPARATOR \"%\") AS url, under_category_article.under_category_id FROM article INNER JOIN img ON article.id = img.article_id INNER JOIN under_category_article ON article.id = under_category_article.article_id GROUP BY article.id, category_id, title, description, price, stock, under_category_article.under_category_id;";
        $stmt = $entityManager->getConnection()->prepare($sql);
        $result = $stmt->executeQuery()->fetchAllAssociative();

        $articles = [];
        foreach ($result as $value) {
            if($value['under_category_id'] === $id) {
                if(str_contains($value['url'], "%")) {
                    $urls = explode("%", $value['url']);
                    $url = $urls[0];
                } else {
                    $url = $value['url'];
                }
                $articles[] = ['id' => $value['id'],
                               'category' => $value['category_id'],
                               'title' => $value['title'],
                               'desc' => $value['description'],
                               'price' => $value['price'],
                               'stock' => $value['stock'],
                               'img' => $url
                              ];
            }
        }

        if (!$result) {
            throw $this->createNotFoundException(
                'pas d"article trouvé'
            );
        }
        return new JsonResponse($articles);
    }
}
