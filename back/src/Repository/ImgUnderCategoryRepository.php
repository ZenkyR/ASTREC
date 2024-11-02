<?php

namespace App\Repository;

use App\Entity\ImgUnderCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ImgUnderCategory>
 *
 * @method ImgUnderCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImgUnderCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImgUnderCategory[]    findAll()
 * @method ImgUnderCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImgUnderCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ImgUnderCategory::class);
    }

//    /**
//     * @return ImgUnderCategory[] Returns an array of ImgUnderCategory objects
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

//    public function findOneBySomeField($value): ?ImgUnderCategory
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
