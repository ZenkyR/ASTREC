<?php

namespace App\Repository;

use App\Entity\StockMail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StockMail>
 *
 * @method StockMail|null find($id, $lockMode = null, $lockVersion = null)
 * @method StockMail|null findOneBy(array $criteria, array $orderBy = null)
 * @method StockMail[]    findAll()
 * @method StockMail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StockMailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StockMail::class);
    }

//    /**
//     * @return StockMail[] Returns an array of StockMail objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?StockMail
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
