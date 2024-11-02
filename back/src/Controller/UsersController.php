<?php

namespace App\Controller;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UsersController extends AbstractController
{
    #[Route('/users', name: 'users')]
    public function getUsers(EntityManagerInterface $entityManager, Request $request) : Response
    {
        $parameters = json_decode($request->getContent(), true);
        if(!isset($parameters['search'])) {
            $parameters['search'] = "";
        }

        $usersRepository = $entityManager->getRepository(Users::class);
        $user = $usersRepository->createQueryBuilder('user')
            ->where('user.name LIKE :query')
            ->setParameter('query', '%' . $parameters['search'] . '%')
            ->getQuery()
            ->getResult();
        $users = [];

        foreach ($user as $value) {
            $users[] = ['id' => $value->getId(),
                        'name' => $value->getName(),
                        'lastname' => $value->getLastname(),
                        'email' => $value->getEmail(),
                        'admin' => $value->isRole()
                       ];
        }

        return new JsonResponse($users);
    }

    #[Route('/users/setAdmin/{id}', name: 'users_setAdmin')]
    public function setAdmin(EntityManagerInterface $entityManager, int $id, Request $request) : Response
    {
        $parameters = json_decode($request->getContent(), true);
        $user = $entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            throw $this->createNotFoundException(
                'pas d"user trouvé'
            );
        }

        if ($parameters['value'] === true) {
            $user->setRole(true);
        } elseif ($parameters['value'] === false) {
            $user->setRole(false);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(1);
    }
}
