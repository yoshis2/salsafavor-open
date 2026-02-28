<?php

namespace Tests\Unit\Repositories;

use App\Models\Genre;
use App\Repositories\GenresRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class GenresRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private GenresRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        // 改善後のリポジトリを想定し、モデルを注入
        $this->repository = new GenresRepository(new Genre);
    }

    #[Test]
    public function list_should_return_an_empty_collection_when_no_genres_exist(): void
    {
        // Arrange: データは何も作成しない

        // Act
        $result = $this->repository->list();

        // Assert
        $this->assertInstanceOf(Collection::class, $result);
        $this->assertTrue($result->isEmpty());
    }

    #[Test]
    public function list_should_return_all_genres(): void
    {
        // Arrange
        Genre::factory()->count(3)->create();

        // Act
        $result = $this->repository->list();

        // Assert
        $this->assertCount(3, $result);
    }
}
