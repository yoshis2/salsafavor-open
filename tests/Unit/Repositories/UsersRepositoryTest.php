<?php

namespace Tests\Unit\Repositories;

use App\Models\User;
use App\Repositories\UsersRepository;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UsersRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new UsersRepository(new User);
    }

    public function test_get_returns_user()
    {
        $user = User::factory()->create();

        $result = $this->repository->get($user->id);

        $this->assertNotNull($result);
        $this->assertEquals($user->id, $result->id);
        $this->assertEquals($user->email, $result->email);
    }

    public function test_create_user()
    {
        $param = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'secret',
            'roles' => 'instructor',
        ];

        $user = $this->repository->create($param);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => 'test@example.com',
        ]);
    }

    public function test_update_user()
    {
        $user = User::factory()->create(['name' => 'Old Name']);
        $currentDateTime = Carbon::now()->toDateTimeString();

        $params = [
            'name' => 'New Name',
            'email' => $user->email,
        ];

        $this->repository->update($params, $user->id, $currentDateTime);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'New Name',
        ]);
    }

    public function test_delete_user()
    {
        $user = User::factory()->create();

        $this->repository->delete($user->id);

        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }
}
