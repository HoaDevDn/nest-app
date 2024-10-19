export async function seedRoleAndUsers() {
  // await AppDataSource.initialize();
  // // const queryRunner = AppDataSource.createQueryRunner();
  // const roleRepository = AppDataSource.getRepository(Role);
  // const userRepository = AppDataSource.getRepository(UserEntity);
  // // await queryRunner.manager.clear(User);
  // // const table = await queryRunner.getTable('user');
  // // const foreignKey = table!.foreignKeys.find(
  // //   (fk) => fk.columnNames.indexOf('roleId') !== -1,
  // // );
  // // if (foreignKey) {
  // //   await queryRunner.dropForeignKey('user', foreignKey);
  // // }
  // // await queryRunner.manager.clear(Role);
  // const adminRole = roleRepository.create({
  //   id: faker.string.uuid(),
  //   name: 'admin',
  // });
  // const userRole = roleRepository.create({
  //   id: faker.string.uuid(),
  //   name: 'user',
  // });
  // await roleRepository.save([adminRole, userRole]);
  // const users = [];
  // for (let i = 0; i < 10; i++) {
  //   const user = userRepository.create({
  //     id: faker.string.uuid(),
  //     name: faker.person.fullName(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //     status: 1,
  //     role: i < 5 ? adminRole : userRole, // Assign the first 5 users as admin, others as user
  //   });
  //   users.push(user);
  // }
  // await userRepository.save(users);
  // // eslint-disable-next-line no-console
  // console.log('Seed data inserted successfully');
  // process.exit(0);
}

seedRoleAndUsers();
