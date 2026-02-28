<?php

namespace Tests\Unit\Repositories;

use App\Models\Prefecture;
use App\Repositories\PrefecturesRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PrefecturesRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private PrefecturesRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new PrefecturesRepository(new Prefecture);
    }

    public function test_list_returns_prefixed_prefectures_list(): void
    {
        // Arrange
        Prefecture::factory()->create(['id' => 1, 'name' => 'Tokyo']);
        Prefecture::factory()->create(['id' => 2, 'name' => 'Osaka']);

        // Act
        $result = $this->repository->list();

        // Assert
        $this->assertEquals([
            '' => '都道府県',
            1 => 'Tokyo',
            2 => 'Osaka',
        ], $result->toArray());
    }

    public function test_get_returns_correct_prefecture(): void
    {
        // Arrange
        $prefecture = Prefecture::factory()->create(['id' => 1, 'name' => 'Tokyo']);
        Prefecture::factory()->create(['id' => 2, 'name' => 'Osaka']);

        // Act
        $result = $this->repository->get(1);

        // Assert
        $this->assertNotNull($result);
        $this->assertEquals('Tokyo', $result->name);
    }

    public function test_get_returns_null_for_non_existent_prefecture(): void
    {
        // Act
        $result = $this->repository->get(999);

        // Assert
        $this->assertNull($result);
    }
}
