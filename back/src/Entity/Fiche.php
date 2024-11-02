<?php

namespace App\Entity;

use App\Repository\FicheRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FicheRepository::class)]
class Fiche
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $marque = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $color = null;

    #[ORM\OneToMany(mappedBy: 'fiche', targetEntity: FicheBis::class, cascade: ['persist', 'remove'])]
    private Collection $ficheBis;

    #[ORM\Column(length: 255)]
    private ?string $size = null;

    #[ORM\Column(length: 255)]
    private ?string $weight = null;

    public function __construct()
    {
        $this->ficheBis = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(?string $marque): static
    {
        $this->marque = $marque;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    /**
     * @return Collection<int, FicheBis>
     */
    public function getFicheBis(): Collection
    {
        return $this->ficheBis;
    }

    public function addFicheBi(FicheBis $ficheBi): static
    {
        if (!$this->ficheBis->contains($ficheBi)) {
            $this->ficheBis->add($ficheBi);
            $ficheBi->setFiche($this);
        }

        return $this;
    }

    public function removeFicheBi(FicheBis $ficheBi): static
    {
        if ($this->ficheBis->removeElement($ficheBi)) {
            // set the owning side to null (unless already changed)
            if ($ficheBi->getFiche() === $this) {
                $ficheBi->setFiche(null);
            }
        }

        return $this;
    }

    public function getSize(): ?string
    {
        return $this->size;
    }

    public function setSize(string $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getWeight(): ?string
    {
        return $this->weight;
    }

    public function setWeight(string $weight): static
    {
        $this->weight = $weight;

        return $this;
    }
}
