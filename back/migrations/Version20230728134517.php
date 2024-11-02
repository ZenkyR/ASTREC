<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230728134517 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fiche ADD article_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE fiche ADD CONSTRAINT FK_4C13CC787294869C FOREIGN KEY (article_id) REFERENCES article (id)');
        $this->addSql('CREATE INDEX IDX_4C13CC787294869C ON fiche (article_id)');
        $this->addSql('ALTER TABLE img ADD article_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE img ADD CONSTRAINT FK_BBC2C8AC7294869C FOREIGN KEY (article_id) REFERENCES article (id)');
        $this->addSql('CREATE INDEX IDX_BBC2C8AC7294869C ON img (article_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE img DROP FOREIGN KEY FK_BBC2C8AC7294869C');
        $this->addSql('DROP INDEX IDX_BBC2C8AC7294869C ON img');
        $this->addSql('ALTER TABLE img DROP article_id');
        $this->addSql('ALTER TABLE fiche DROP FOREIGN KEY FK_4C13CC787294869C');
        $this->addSql('DROP INDEX IDX_4C13CC787294869C ON fiche');
        $this->addSql('ALTER TABLE fiche DROP article_id');
    }
}
