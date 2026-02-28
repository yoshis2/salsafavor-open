<?php

namespace Tests\Unit\Services;

use App\Repositories\UserProfilesRepository;
use App\Services\UserProfilesService;
use Carbon\Carbon;
use Mockery;
use Tests\TestCase;

class UserProfilesServiceTest extends TestCase
{
    protected $service;

    protected $userProfilesRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->userProfilesRepository = Mockery::mock(UserProfilesRepository::class);
        $this->service = new UserProfilesService($this->userProfilesRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_calls_repository()
    {
        $this->userProfilesRepository->shouldReceive('get')
            ->with(1)
            ->once()
            ->andReturn((object) ['user_id' => 1]);

        $result = $this->service->get(1);
        $this->assertEquals(1, $result->user_id);
    }

    public function test_store_calls_repository_with_datetime()
    {
        $param = ['prefecture_id' => 1, 'address' => 'Test'];
        $now = Carbon::now();
        Carbon::setTestNow($now);

        $this->userProfilesRepository->shouldReceive('store')
            ->with($param, 1, 'image.jpg', $now->toDateTimeString())
            ->once()
            ->andReturn(true);

        $result = $this->service->store($param, 1, 'image.jpg');
        $this->assertTrue($result);
    }
}
