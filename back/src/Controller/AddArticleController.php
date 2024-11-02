<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Img;
use App\Entity\Fiche;
use App\Entity\FicheBis;
use App\Entity\Tag;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AddArticleController extends AbstractController
{
    #[Route('/add/article', name: 'app_add_article')]
    public function index(EntityManagerInterface $entityManager, Request $request): Response
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
        $underCategoryid = intval($request->get('underCategory'));

        $article = new Article();
        $article->setTitle($data->get('title'));
        $article->setPrice($data->get('price'));
        $article->setStock($data->get('stock'));
        $article->setView(0);
        $article->setDescription($data->get('description'));
        $article->setCategory($category);
        $article->addUnderCategory($category->getUnderCategories()[$underCategoryid]);

        $fiche = new Fiche();
        $fiche->setMarque($data->get('marque'));
        $fiche->setColor($data->get('color'));
        $fiche->setSize($data->get('size'));
        $fiche->setWeight($data->get('weight'));

        $article->setFiche($fiche);
        
        $nameBis = $data->all('nameBis');
        $valueBis = $data->all('valueBis');
        
        for ($i = 0; $i < count($nameBis); $i++) {
            $bis = new FicheBis();
            $bis->setName($nameBis[$i]);
            $bis->setValue($valueBis[$i]);
            $bis->setFiche($fiche);
            $entityManager->persist($bis);
        }

        $tags = $data->all('tag');

        foreach ($tags as $tagName) {
            $tag = new Tag();
            $tag->setName($tagName);
            $tag->setArticle($article); 
            $entityManager->persist($tag);
        }

        foreach ($imgPaths as $imgPath) {
            $img = new Img();
            $img->setUrl($imgPath);
            $img->setArticle($article);
            $entityManager->persist($img);
        }

        $entityManager->persist($article);
        $entityManager->flush();

       return new Response('Article ajouté');
    }
}
