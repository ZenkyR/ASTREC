<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Article::class, cascade: ['persist', 'remove'])]
    private Collection $articles;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: UnderCategory::class ,cascade: ['persist', 'remove'])]
    private Collection $underCategories;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?ImgCategory $img = null;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->underCategories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): static
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->setCategory($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): static
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getCategory() === $this) {
                $article->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, UnderCategory>
     */
    public function getUnderCategories(): Collection
    {
        return $this->underCategories;
    }

    public function addUnderCategory(UnderCategory $underCategory): static
    {
        if (!$this->underCategories->contains($underCategory)) {
            $this->underCategories->add($underCategory);
            $underCategory->setCategory($this);
        }

        return $this;
    }

    public function removeUnderCategory(UnderCategory $underCategory): static
    {
        if ($this->underCategories->removeElement($underCategory)) {
            // set the owning side to null (unless already changed)
            if ($underCategory->getCategory() === $this) {
                $underCategory->setCategory(null);
            }
        }

        return $this;
    }

    public function getImg(): ?ImgCategory
    {
        return $this->img;
    }

    public function setImg(?ImgCategory $img): static
    {
        $this->img = $img;

        return $this;
    }
}
