<?php

namespace App\Entity;

use App\Repository\UnderCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UnderCategoryRepository::class)]
class UnderCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'underCategories' ,targetEntity: Category::class)]
    private ?category $category = null;

    #[ORM\ManyToMany(targetEntity: Article::class, inversedBy: 'underCategories', cascade: ['persist', 'remove'])]
    private Collection $article;
    
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?ImgUnderCategory $img = null;

    public function __construct()
    {
        $this->article = new ArrayCollection();
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

    public function getCategory(): ?category
    {
        return $this->category;
    }

    public function setCategory(?category $category): static
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection<int, article>
     */
    public function getArticle(): Collection
    {
        return $this->article;
    }

    public function addArticle(article $article): static
    {
        if (!$this->article->contains($article)) {
            $this->article->add($article);
        }

        return $this;
    }

    public function removeArticle(article $article): static
    {
        $this->article->removeElement($article);

        return $this;
    }

    public function getImg(): ?ImgUnderCategory
    {
        return $this->img;
    }

    public function setImg(?ImgUnderCategory $img): static
    {
        $this->img = $img;

        return $this;
    }
}
