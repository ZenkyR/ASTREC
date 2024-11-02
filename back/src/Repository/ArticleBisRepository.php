<?php

namespace App\Repository;

use App\Entity\ArticleBis;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ArticleBis>
 *
 * @method ArticleBis|null find($id, $lockMode = null, $lockVersion = null)
 * @method ArticleBis|null findOneBy(array $criteria, array $orderBy = null)
 * @method ArticleBis[]    findAll()
 * @method ArticleBis[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleBisRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ArticleBis::class);
    }

//    /**
//     * @return ArticleBis[] Returns an array of ArticleBis objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ArticleBis
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
