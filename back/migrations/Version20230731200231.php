<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230731200231 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE under_category (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_7D8C02A612469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE under_category_article (under_category_id INT NOT NULL, article_id INT NOT NULL, INDEX IDX_E5FFE0E46D8C4916 (under_category_id), INDEX IDX_E5FFE0E47294869C (article_id), PRIMARY KEY(under_category_id, article_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE under_category ADD CONSTRAINT FK_7D8C02A612469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE under_category_article ADD CONSTRAINT FK_E5FFE0E46D8C4916 FOREIGN KEY (under_category_id) REFERENCES under_category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE under_category_article ADD CONSTRAINT FK_E5FFE0E47294869C FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE fiche DROP FOREIGN KEY FK_4C13CC787294869C');
        $this->addSql('DROP TABLE fiche');
        $this->addSql('ALTER TABLE article ADD stock INT NOT NULL, ADD view INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE fiche (id INT AUTO_INCREMENT NOT NULL, article_id INT DEFAULT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, info VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_4C13CC787294869C (article_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE fiche ADD CONSTRAINT FK_4C13CC787294869C FOREIGN KEY (article_id) REFERENCES article (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE under_category DROP FOREIGN KEY FK_7D8C02A612469DE2');
        $this->addSql('ALTER TABLE under_category_article DROP FOREIGN KEY FK_E5FFE0E46D8C4916');
        $this->addSql('ALTER TABLE under_category_article DROP FOREIGN KEY FK_E5FFE0E47294869C');
        $this->addSql('DROP TABLE under_category');
        $this->addSql('DROP TABLE under_category_article');
        $this->addSql('ALTER TABLE article DROP stock, DROP view');
    }
}
