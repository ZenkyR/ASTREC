<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230802214757 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE img_under_category (id INT AUTO_INCREMENT NOT NULL, url VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE under_category DROP FOREIGN KEY FK_7D8C02A6C06A9F55');
        $this->addSql('ALTER TABLE under_category CHANGE img_id img_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE under_category ADD CONSTRAINT FK_7D8C02A6C06A9F55 FOREIGN KEY (img_id) REFERENCES img_under_category (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE under_category DROP FOREIGN KEY FK_7D8C02A6C06A9F55');
        $this->addSql('DROP TABLE img_under_category');
        $this->addSql('ALTER TABLE under_category DROP FOREIGN KEY FK_7D8C02A6C06A9F55');
        $this->addSql('ALTER TABLE under_category CHANGE img_id img_id INT NOT NULL');
        $this->addSql('ALTER TABLE under_category ADD CONSTRAINT FK_7D8C02A6C06A9F55 FOREIGN KEY (img_id) REFERENCES img_category (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
