<?php

namespace App\Repository;

use App\Entity\Fdp;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Fdp>
 *
 * @method Fdp|null find($id, $lockMode = null, $lockVersion = null)
 * @method Fdp|null findOneBy(array $criteria, array $orderBy = null)
 * @method Fdp[]    findAll()
 * @method Fdp[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FdpRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Fdp::class);
    }

//    /**
//     * @return Fdp[] Returns an array of Fdp objects
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

//    public function findOneBySomeField($value): ?Fdp
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
