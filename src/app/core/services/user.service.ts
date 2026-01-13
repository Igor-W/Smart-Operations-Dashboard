import { Injectable } from '@angular/core';
import { users } from '../../data/users';
import { IRegisterForm } from '../../common/interfaces/IRegisterForm';
import { usersData } from '../../data/usersData';
import { IUser } from '../../common/interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  create(data: IRegisterForm): IUser {
    const id = users.length + 1;
    const user = { id, email: data.email, role: 'user' as const, password: data.password };

    users.push(user);
    usersData.push({
      userId: id,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      countryCode: data.countryCode,
      phoneNumber: data.phoneNumber,
      country: data.country,
      city: data.city,
      street: data.street,
    });

    return { id: user.id, email: user.email, role: user.role };
  }
}
