<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Img;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ArticleController extends AbstractController
{
    #[Route('/article', name: 'app_article')]
    public function index(EntityManagerInterface $entityManager, Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        if(!isset($parameters['search'])) {
            $parameters['search'] = "";
        }

        $articleRepository = $entityManager->getRepository(Article::class);
        $article = $articleRepository->createQueryBuilder('article')
            ->where('article.title LIKE :query')
            ->setParameter('query', '%' . $parameters['search'] . '%')
            ->orderBy('article.view', 'DESC')
            ->getQuery()
            ->getResult();
        $article_name = [];

        foreach ($article as $value) {
            $imagePaths = [];

            foreach ($value->getImg() as $img) {
                $imagePaths[] = $img->getUrl();
            }

            $article_name[] = [
                'id' => $value->getId(),
                'name' => $value->getTitle(),
                'img' => $imagePaths,
                'stock' => $value->getStock(),
                'desc' => $value->getDescription(),
                'price' => $value->getPrice(),
            ];
        }

        return new JsonResponse($article_name);
    }

    #[Route('/article/new', name: 'app_new_article')]
    public function showNewArticle(EntityManagerInterface $entityManager): Response
    {
        $article = $entityManager->getRepository(Article::class)->findBy(array(), array("createdAt" => "DESC"));
        $article_name = [];

        foreach ($article as $value) {
            $imagePaths = [];

            foreach ($value->getImg() as $img) {
                $imagePaths[] = $img->getUrl();
            }

            $article_name[] = [
                'id' => $value->getId(),
                'name' => $value->getTitle(),
                'img' => $imagePaths,
                'stock' => $value->getStock(),
                'desc' => $value->getDescription(),
                'price' => $value->getPrice(),
            ];
        }

        if (!$article) {
            throw $this->createNotFoundException(
                'pas d"article trouvé'
            );
        }
        return new JsonResponse($article_name);
    }

    #[Route('/article/modif/{id}', name: 'app_article_modif')]
    public function modif(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $imgPaths = [];
        $imgs = $request->files->all();

        foreach ($imgs as $img) {
            foreach ($img as $i) {
                $img = $i;
                $imgName = uniqid() . '.' . $img->guessExtension();
                $img->move(
                    $this->getParameter('kernel.project_dir') . '/public/images',
                    $imgName
                );
                $http = $request->getScheme() . '://';
                $domain = $_SERVER['HTTP_HOST'];
                $imgPath = $http . $domain . '/images/' . $imgName;
                $imgPaths[] = $imgPath;
            }
        }

        $data = $request->request;

        $categoryid = intval($request->get('category'));
        $category = $entityManager->getRepository(Category::class)->find($categoryid);

        $article = $entityManager->getRepository(Article::class)->find($id);
        $article->setTitle($data->get('title'));
        $article->setPrice($data->get('price'));
        $article->setStock($data->get('stock'));
        $article->setView(0);
        $article->setDescription($data->get('description'));
        $article->setCategory($category);

        foreach ($imgPaths as $imgPath) {
            $img = new Img();
            $img->setUrl($imgPath);
            $img->setArticle($article);
            $entityManager->persist($img);
        }

        $entityManager->persist($article);
        $entityManager->flush();

        return new Response('Article modifié');
    }

    #[Route('/article/delete/{id}', name: 'app_article_delete')]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $article = $entityManager->getRepository(Article::class)->find($id);
        $images = $article->getImg();

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

        $entityManager->remove($article);
        $entityManager->flush();

        return new Response('Article supprimé');
    }
}
