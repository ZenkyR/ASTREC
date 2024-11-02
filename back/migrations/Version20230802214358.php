<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230802214358 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE img_category (id INT AUTO_INCREMENT NOT NULL, url VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE article CHANGE description description VARCHAR(2000) NOT NULL');
        $this->addSql('ALTER TABLE category ADD img_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C1C06A9F55 FOREIGN KEY (img_id) REFERENCES img_category (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_64C19C1C06A9F55 ON category (img_id)');
        $this->addSql('ALTER TABLE under_category ADD img_id INT NOT NULL');
        $this->addSql('ALTER TABLE under_category ADD CONSTRAINT FK_7D8C02A6C06A9F55 FOREIGN KEY (img_id) REFERENCES img_category (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7D8C02A6C06A9F55 ON under_category (img_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C1C06A9F55');
        $this->addSql('ALTER TABLE under_category DROP FOREIGN KEY FK_7D8C02A6C06A9F55');
        $this->addSql('DROP TABLE img_category');
        $this->addSql('ALTER TABLE article CHANGE description description VARCHAR(255) NOT NULL');
        $this->addSql('DROP INDEX UNIQ_7D8C02A6C06A9F55 ON under_category');
        $this->addSql('ALTER TABLE under_category DROP img_id');
        $this->addSql('DROP INDEX UNIQ_64C19C1C06A9F55 ON category');
        $this->addSql('ALTER TABLE category DROP img_id');
    }
}
