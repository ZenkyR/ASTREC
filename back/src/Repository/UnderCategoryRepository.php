<?php

namespace App\Repository;

use App\Entity\UnderCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UnderCategory>
 *
 * @method UnderCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method UnderCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method UnderCategory[]    findAll()
 * @method UnderCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UnderCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UnderCategory::class);
    }

//    /**
//     * @return UnderCategory[] Returns an array of UnderCategory objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?UnderCategory
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
