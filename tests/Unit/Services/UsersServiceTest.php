<?php

namespace Tests\Unit\Services;

use App\Repositories\UserProfilesRepository;
use App\Repositories\UsersRepository;
use App\Services\EventsService;
use App\Services\ImageService;
use App\Services\LessonsService;
use App\Services\UsersService;
use Illuminate\Support\Facades\Hash;
use Mockery;
use Tests\TestCase;

class UsersServiceTest extends TestCase
{
    protected $service;

    protected $imageService;

    protected $eventsService;

    protected $lessonsService;

    protected $usersRepository;

    protected $userProfilesRepository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->imageService = Mockery::mock(ImageService::class);
        $this->eventsService = Mockery::mock(EventsService::class);
        $this->lessonsService = Mockery::mock(LessonsService::class);
        $this->usersRepository = Mockery::mock(UsersRepository::class);
        $this->userProfilesRepository = Mockery::mock(UserProfilesRepository::class);

        $this->service = new UsersService(
            $this->imageService,
            $this->eventsService,
            $this->lessonsService,
            $this->usersRepository,
            $this->userProfilesRepository
        );
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_calls_repository()
    {
        $this->usersRepository->shouldReceive('get')->with(1)->once()->andReturn((object) ['id' => 1]);

        $result = $this->service->get(1);

        $this->assertEquals(1, $result->id);
    }

    public function test_create_hashes_password_and_calls_repository()
    {
        $data = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
        ];

        $this->usersRepository->shouldReceive('create')->with(Mockery::on(function ($param) {
            return $param['name'] === 'Test User' &&
                $param['email'] === 'test@example.com' &&
                Hash::check('password123', $param['password']) &&
                $param['roles'] === 'instructor';
        }))->once()->andReturn((object) ['id' => 1]);

        $result = $this->service->create($data);
        $this->assertEquals(1, $result->id);
    }

    public function test_check_password_returns_true_for_valid_password()
    {
        $password = 'secret';
        $hashed = Hash::make($password);

        $this->assertTrue($this->service->checkPassword($password, $hashed));
    }
}
