<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;

class FilterController extends AbstractController
{
    #[Route('/filters', name: 'filters')]
    public function applyTri(EntityManagerInterface $entityManager, Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $tri = $parameters['tri'];
        $filters = $parameters['filters'];
        $prixMin = $parameters['prixMin'];
        $prixMax = $parameters['prixMax'];
        $compteur = 0;

        if(isset($parameters['search']) && $parameters['search'] !== null) {
            $search = $parameters['search'];
        } else {
            $search = null;
        }

        $sql = "SELECT article.id, category_id, title, created_at, view, description, price, stock, GROUP_CONCAT(img.url SEPARATOR \"%\") AS url, under_category_article.under_category_id FROM article INNER JOIN img ON article.id = img.article_id INNER JOIN under_category_article ON article.id = under_category_article.article_id";

        if($prixMin !== null && $prixMax !== null && $prixMin <= $prixMax) {
            $compteur = $compteur + 1;
            $sql .= " WHERE ((price >= " . $prixMin . ") AND (price <= " . $prixMax . ")";
        }

        foreach($filters as $filter) {
            $compteur = $compteur + 1;
            if($compteur === 1) {
                switch($filter) {
                    case "dispoyes":
                        $sql .= " WHERE ((stock > 0)";
                        break;
                    case "dispono":
                        $sql .= " WHERE ((stock = 0)";
                        break;
                  
                }
            } else if($compteur > 1) {
                switch($filter) {
                    case "dispoyes":
                        $sql .= " AND (stock > 0)";
                        break;
                    case "dispono":
                        $sql .= " AND (stock = 0)";
                        break;
                      
                }
            }
        }

        if($search !== null) {
            if(str_contains($sql, "WHERE")) {
                $sql .= ") AND (title LIKE '%" . $search . "%')";
            } else {
                $sql .= " WHERE (title LIKE '%" . $search . "%')";
            }
        } else if($search === null && str_contains($sql, "WHERE")) {
            $sql .= ")";
        }

        $sql .= " GROUP BY article.id, category_id, title, created_at, description, price, stock, view, under_category_article.under_category_id";

        switch($tri) {
            case "pertinence":
                $sql .= " ORDER BY view DESC";
                break;
            case "recent":
                $sql .= " ORDER BY created_at DESC";
                break;
            case "ancien":
                $sql .= " ORDER BY created_at ASC";
                break;
            case "pluscher":
                $sql .= " ORDER BY price DESC";
                break;
            case "moinscher":
                $sql .= " ORDER BY price ASC";
                break;
        }


        $stmt = $entityManager->getConnection()->prepare($sql);
        $result = $stmt->executeQuery()->fetchAllAssociative();

        $articles = [];

        foreach ($result as $value) {
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
                           'img' => $url,
                           'createdAt' => $value['created_at']
                          ];
        }

        return new JsonResponse($articles);
    }
}