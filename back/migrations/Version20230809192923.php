<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230809192923 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE article ADD fiche_id INT DEFAULT NULL, DROP characteristic, CHANGE updated_at updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E66DF522508 FOREIGN KEY (fiche_id) REFERENCES fiche (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_23A0E66DF522508 ON article (fiche_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE article DROP FOREIGN KEY FK_23A0E66DF522508');
        $this->addSql('DROP INDEX UNIQ_23A0E66DF522508 ON article');
        $this->addSql('ALTER TABLE article ADD characteristic VARCHAR(255) NOT NULL, DROP fiche_id, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL');
    }
}
