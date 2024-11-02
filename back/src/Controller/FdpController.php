<?php

namespace App\Controller;

use App\Entity\Fdp;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;


class FdpController extends AbstractController
{
    #[Route('/addFdp', name: 'app_fdp')]
    public function index(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = $request->request;

        $fdp = new Fdp();
        $fdp->setName($data->get('name'));
        $fdp->setPrice($data->get('price'));
        $fdp->setSize($data->get('size'));
        $fdp->setWeight($data->get('weight'));
        $fdp->setPays($data->get('pays'));

        $entityManager->persist($fdp);
        $entityManager->flush();


        return new Response("add fdp");
    }

    #[Route('/fdp', name: 'fdp')]
    public function fdp(EntityManagerInterface $entityManager, Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        if(!isset($parameters['search'])) {
            $parameters['search'] = "";
        }

        $fdpRepository = $entityManager->getRepository(Fdp::class);
        $fdp = $fdpRepository->createQueryBuilder('fdp')
            ->where('fdp.name LIKE :query')
            ->setParameter('query', '%' . $parameters['search'] . '%')
            ->getQuery()
            ->getResult();
        $result = [];

        foreach ($fdp as $value) {
            $result[] = [
                'id' => $value->getId(),
                'name' => $value->getName(),
                'price' => $value->getPrice(),
                'size' => $value->getSize(),
                'weight' => $value->getWeight(),
                'pays' => $value->getPays()
            ];
        }

        return new JsonResponse($result);
    }

    #[Route('/fdp/delete/{id}', name: 'fdp_delete')]
    public function delete(EntityManagerInterface $entityManager, Request $request, $id): Response
    {
        $fdp = $entityManager->getRepository(fdp::class)->find($id);

        $entityManager->remove($fdp);
        $entityManager->flush();

        return new Response("delete fdp");
    }

    #[Route('/fdp/update/{id}', name: 'fdp_update')]
    public function update(EntityManagerInterface $entityManager, Request $request, $id): Response
    {
        $data = $request->request;

        $fdp = $entityManager->getRepository(fdp::class)->find($id);

        $fdp->setName($data->get('name'));
        $fdp->setPrice($data->get('price'));
        $fdp->setSize($data->get('size'));
        $fdp->setWeight($data->get('weight'));
        $fdp->setPays($data->get('pays'));

        $entityManager->flush();

        return new Response("update fdp");
    }

    #[Route('/fdp/{id}', name: 'fdp_id')]
    public function fdpId(EntityManagerInterface $entityManager, Request $request, $id): Response
    {
        $fdp = $entityManager->getRepository(fdp::class)->find($id);

        $result = [
            'id' => $fdp->getId(),
            'name' => $fdp->getName(),
            'price' => $fdp->getPrice(),
            'size' => $fdp->getSize(),
            'weight' => $fdp->getWeight(),
            'pays' => $fdp->getPays()
        ];

        return new JsonResponse($result);
    }
}
