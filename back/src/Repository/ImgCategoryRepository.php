<?php

namespace App\Repository;

use App\Entity\ImgCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ImgCategory>
 *
 * @method ImgCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImgCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImgCategory[]    findAll()
 * @method ImgCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImgCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ImgCategory::class);
    }

//    /**
//     * @return ImgCategory[] Returns an array of ImgCategory objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ImgCategory
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
