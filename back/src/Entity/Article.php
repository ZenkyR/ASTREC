<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Authentication\RememberMe\PersistentToken;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 2000)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category = null;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: Img::class, cascade: ['persist'], orphanRemoval: true)]
    private Collection $img;

    #[ORM\Column]
    private ?int $stock = null;

    #[ORM\Column(nullable: true)]
    private ?int $view = null;

    #[ORM\Column(type: 'datetime', options: ['default' => 'CURRENT_TIMESTAMP'])]
    private ?\DateTimeInterface $createdAt = null;    

    #[ORM\Column(type: 'datetime')]
    #[ORM\Version]
    private ?\DateTimeInterface $updatedAt = null;

    #[ORM\ManyToMany(targetEntity: UnderCategory::class, mappedBy: 'article')]
    private Collection $underCategories;

    #[ORM\OneToOne(targetEntity: Fiche::class, cascade: ['persist', 'remove'])]
    private ?fiche $fiche = null;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: ArticleBis::class)]
    private Collection $articleBis;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: StockMail::class)]
    private Collection $stockMails;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: Tag::class, cascade: ['persist', 'remove'])]
    private Collection $tags;

    public function __construct()
    {
        $this->img = new ArrayCollection();
        $this->underCategories = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->articleBis = new ArrayCollection();
        $this->stockMails = new ArrayCollection();
        $this->tags = new ArrayCollection();
        
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection<int, img>
     */
    public function getImg(): Collection
    {
        return $this->img;
    }

    public function addImg(Img $img): static
    {
        if (!$this->img->contains($img)) {
            $this->img->add($img);
            $img->setArticle($this);
        }

        return $this;
    }

    public function removeImg(Img $img): static
    {
        if ($this->img->removeElement($img)) {
            // set the owning side to null (unless already changed)
            if ($img->getArticle() === $this) {
                $img->setArticle(null);
            }
        }

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getView(): ?int
    {
        return $this->view;
    }

    public function setView(?int $view): static
    {
        $this->view = $view;

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
            $underCategory->addArticle($this);
        }

        return $this;
    }

    public function removeUnderCategory(UnderCategory $underCategory): static
    {
        if ($this->underCategories->removeElement($underCategory)) {
            $underCategory->removeArticle($this);
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getFiche(): ?fiche
    {
        return $this->fiche;
    }

    public function setFiche(?fiche $fiche): static
    {
        $this->fiche = $fiche;

        return $this;
    }

    /**
     * @return Collection<int, ArticleBis>
     */
    public function getArticleBis(): Collection
    {
        return $this->articleBis;
    }

    public function addArticleBi(ArticleBis $articleBi): static
    {
        if (!$this->articleBis->contains($articleBi)) {
            $this->articleBis->add($articleBi);
            $articleBi->setArticle($this);
        }

        return $this;
    }

    public function removeArticleBi(ArticleBis $articleBi): static
    {
        if ($this->articleBis->removeElement($articleBi)) {
            // set the owning side to null (unless already changed)
            if ($articleBi->getArticle() === $this) {
                $articleBi->setArticle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, StockMail>
     */
    public function getStockMails(): Collection
    {
        return $this->stockMails;
    }

    public function addStockMail(StockMail $stockMail): static
    {
        if (!$this->stockMails->contains($stockMail)) {
            $this->stockMails->add($stockMail);
            $stockMail->setArticle($this);
        }

        return $this;
    }

    public function removeStockMail(StockMail $stockMail): static
    {
        if ($this->stockMails->removeElement($stockMail)) {
            // set the owning side to null (unless already changed)
            if ($stockMail->getArticle() === $this) {
                $stockMail->setArticle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
            $tag->setArticle($this);
        }

        return $this;
    }

    public function removeTag(Tag $tag): static
    {
        if ($this->tags->removeElement($tag)) {
            // set the owning side to null (unless already changed)
            if ($tag->getArticle() === $this) {
                $tag->setArticle(null);
            }
        }

        return $this;
    }

}
