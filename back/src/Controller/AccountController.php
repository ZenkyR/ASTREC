<?php

namespace App\Controller;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AccountController extends AbstractController
{
    #[Route('/register', name: 'register')]
    public function register(Request $request, EntityManagerInterface $entityManager): Response
    {
        
        $session = $request->getSession();
        $data = json_decode($request->getContent(), true);

        $data = $data['data'];
        $fname = $data['fname'];
        $lname = $data['lname'];
        $email = $data['email'];

        if ($data['pwd'] !== $data['pwdconf']) {
            return new Response(0);
        }

        $pwd = password_hash($data['pwd'], PASSWORD_DEFAULT);

        $user = new Users();
        $userVerify = $entityManager->getRepository(Users::class)->findOneBy(['email' => $email]);

        if (!isset($userVerify) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $admin = 0;

            $user->setName($fname);
            $user->setLastname($lname);
            $user->setEmail($email);
            $user->setPassword($pwd);
            $user->setRole($admin);

            $entityManager->persist($user);
            $entityManager->flush();

            $session->set('email', $email);

            if ($admin === 1) {
                return new Response(2);
            } else {
                return new Response(1);
            }
        }
        return new Response(0);
    }

    #[Route('/regist/google', name: 'regist_google')]
    public function registgoogle(Request $request, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();

        $data = $request->request;

        $pwd = $data->get('pwd');

        $pwd = rand(2, 10);

        $email = $data->get('email');

        $pwd = password_hash($pwd, PASSWORD_DEFAULT);

        $user = new Users();
        $userVerify = $entityManager->getRepository(Users::class)->findOneBy(['email' => $email]);

        if (!isset($userVerify) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $admin = 0;

            $user->setName($data->get('name'));
            $user->setLastname('');
            $user->setEmail($email);
            $user->setPassword($pwd);
            $user->setRole($admin);

            $entityManager->persist($user);
            $entityManager->flush();

            $session->set('email', $email);


            return new Response(1);
        }

        return new Response(0);
    }

    #[Route('/login', name: 'login')]
    public function login(Request $request, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();
        $data = json_decode($request->getContent(), true);

        $data = $data['data'];
        $email = $data['email'];
        $pwd = $data['pwd'];

        $userVerify = $entityManager->getRepository(Users::class)->findOneBy(['email' => $email]);

        if ($email === $userVerify->getEmail() && password_verify($pwd, $userVerify->getPassword())) {
            $session->set('email', $email);
            if ($userVerify->isRole() == 1) {
                return new Response(2);
            } else {
                return new Response(1);
            }
        }
        return new Response(0);
    }

    #[Route('/login/google', name: 'login_google')]
    public function loginGoogle(Request $request, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();

        $data = $request->request;

        $email = $data->get('email');

        $userVerify = $entityManager->getRepository(Users::class)->findOneBy(['email' => $email]);

        if ($email === $userVerify->getEmail()) {
            $session->set('email', $email);

            return new Response(1);
        }

        return new Response(0);
    }

    #[Route('/deco', name: 'deco')]
    public function deco(Request $request): Response
    {
        $session = $request->getSession();
        if ($session->get('email') !== "") {
            $session->remove('email');
            return new Response(1);
        } else {
            return new Response(0);
        }
    }
}
