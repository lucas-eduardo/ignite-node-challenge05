import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({id: user_id},{relations: ["games"]});

    return user || {} as User;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const query = "SELECT * FROM users ORDER BY first_name";

    return this.repository.query(query); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const firstName = first_name.toLocaleLowerCase();
    const lastName = last_name.toLocaleLowerCase();

    const query = `SELECT * FROM users WHERE LOWER(first_name) = '${firstName}' AND LOWER(last_name) = '${lastName}'`;
    
    return this.repository.query(query); 
  }
}
