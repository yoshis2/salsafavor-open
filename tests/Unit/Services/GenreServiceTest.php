<?php

namespace Tests\Unit\Services;

use App\Repositories\GenresRepository;
use App\Services\GenreService;
use Illuminate\Database\Eloquent\Collection;
use Mockery;
use Tests\TestCase;

class GenreServiceTest extends TestCase
{
    private GenreService $service;

    private $genresRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->genresRepository = Mockery::mock(GenresRepository::class);
        $this->service = new GenreService($this->genresRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_list_returns_repository_result(): void
    {
        // Arrange
        $collection = new Collection;
        $this->genresRepository->shouldReceive('list')
            ->once()
            ->andReturn($collection);

        // Act
        $result = $this->service->list();

        // Assert
        $this->assertSame($collection, $result);
    }

    public function test_get_i_ds_returns_array_of_ids(): void
    {
        // Arrange
        $genre1 = (object) ['id' => 1];
        $genre2 = (object) ['id' => 2];
        $genres = [$genre1, $genre2];

        // Act
        $result = $this->service->getIDs($genres);

        // Assert
        $this->assertEquals([1, 2], $result);
    }
}
