<?php

namespace App\Repository;

use App\Entity\FicheBis;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FicheBis>
 *
 * @method FicheBis|null find($id, $lockMode = null, $lockVersion = null)
 * @method FicheBis|null findOneBy(array $criteria, array $orderBy = null)
 * @method FicheBis[]    findAll()
 * @method FicheBis[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FicheBisRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FicheBis::class);
    }

//    /**
//     * @return FicheBis[] Returns an array of FicheBis objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?FicheBis
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
