<?php

namespace App\Controller;

use App\Entity\UnderCategory;
use App\Entity\Category;
use App\Entity\ImgUnderCategory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AddSousCategoryController extends AbstractController
{
    #[Route('/add/sous_category', name: 'app_add_sous_category')]
    public function add_sous_category(EntityManagerInterface $entityManager, Request $request): Response
    {
        $r = $request->request->all();
        $imgPaths = [];

        $imgFile = $request->files->get('sous_file');

        $underImgName = uniqid() . '.' . $imgFile->guessExtension();
        $imgFile->move(
            $this->getParameter('kernel.project_dir') . '/public/images',
            $underImgName
        );
        $http = $request->getScheme() . '://';
        $domain = $_SERVER['HTTP_HOST'];
        $imgPath = $http . $domain . '/images/' . $underImgName;
        $imgPaths[] = $imgPath;

        $data = $request->request;

        $categoryid = intval($request->get('idCat'));
        $category = $entityManager->getRepository(Category::class)->find($categoryid);

        $underCategory = new UnderCategory();
        $underCategory->setName($data->get('sous_title'));
        $underCategory->setCategory($category);
        $underCategory->setImg($underCategory->getId());

        foreach ($imgPaths as $imgPath) {
            $imgCategory = new ImgUnderCategory();
            $imgCategory->setUrl($imgPath);
            $underCategory->setImg($imgCategory);

            $entityManager->persist($imgCategory);
        }

        $entityManager->persist($underCategory);
        $entityManager->flush();

        return new Response('add sous cat');
    }
}
