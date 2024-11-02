<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230830072538 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE article_tag (article_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_919694F97294869C (article_id), INDEX IDX_919694F9BAD26311 (tag_id), PRIMARY KEY(article_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE article_tag ADD CONSTRAINT FK_919694F97294869C FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE article_tag ADD CONSTRAINT FK_919694F9BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE article CHANGE updated_at updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE fiche DROP fiche_bis_id');
        $this->addSql('ALTER TABLE fiche_bis ADD fiche_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE fiche_bis ADD CONSTRAINT FK_ACF184B0DF522508 FOREIGN KEY (fiche_id) REFERENCES fiche (id)');
        $this->addSql('CREATE INDEX IDX_ACF184B0DF522508 ON fiche_bis (fiche_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE article_tag DROP FOREIGN KEY FK_919694F97294869C');
        $this->addSql('ALTER TABLE article_tag DROP FOREIGN KEY FK_919694F9BAD26311');
        $this->addSql('DROP TABLE article_tag');
        $this->addSql('DROP TABLE tag');
        $this->addSql('ALTER TABLE fiche ADD fiche_bis_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE fiche_bis DROP FOREIGN KEY FK_ACF184B0DF522508');
        $this->addSql('DROP INDEX IDX_ACF184B0DF522508 ON fiche_bis');
        $this->addSql('ALTER TABLE fiche_bis DROP fiche_id');
        $this->addSql('ALTER TABLE article CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL');
    }
}
