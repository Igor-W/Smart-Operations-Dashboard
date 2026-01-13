import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  CountriesAndCitiesData,
  CountriesDialCodesData,
  CountriesService,
} from '../../core/services/countries.service';
import {
  ChildFieldContext,
  customError,
  Field,
  form,
  maxLength,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import { toSignal } from '@angular/core/rxjs-interop';
import { IRegisterForm } from '../../common/interfaces/IRegisterForm';
import { UserService } from '../../core/services/user.service';
import { AuthStore } from '../../core/auth/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    Field,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="register-card">
      <form (submit)="register(); $event.preventDefault()" class="register-form">
        <h2>Register</h2>

        <div class="row first">
          <mat-form-field appearance="fill" class="col">
            <mat-label>Email</mat-label>
            <input [field]="registerForm.email" matInput type="email" />
            @for(error of registerForm.email().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="col">
            <mat-label>Password</mat-label>
            <input [field]="registerForm.password" matInput type="password" />
            @for(error of registerForm.password().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="col">
            <mat-label>Confirm Password</mat-label>
            <input [field]="registerForm.confirmPassword" matInput type="password" />
            @for(error of registerForm.confirmPassword().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="row second">
          <mat-form-field appearance="fill" class="col">
            <mat-label>First Name</mat-label>
            <input [field]="registerForm.firstName" matInput type="text" />
            @for(error of registerForm.firstName().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="col">
            <mat-label>Last Name</mat-label>
            <input [field]="registerForm.lastName" matInput type="text" />
            @for(error of registerForm.lastName().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="col">
            <mat-label>Gender</mat-label>
            <mat-select [field]="registerForm.gender">
              <mat-option value="male">Male</mat-option>
              <mat-option value="female">Female</mat-option>
            </mat-select>
            @for(error of registerForm.gender().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="row second split">
          <mat-form-field appearance="fill" class="col phone-group">
            <mat-label>Country Code</mat-label>
            <mat-select [field]="registerForm.countryCode">
              @for(code of countriesCodes$ | async; track code.code) {
              <mat-option [value]="code.dial_code">
                {{ code.name }} ({{ code.dial_code }})
              </mat-option>
              }
            </mat-select>
            @for(error of registerForm.countryCode().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="col">
            <mat-label>Phone Number</mat-label>
            <input
              matInput
              type="tel"
              placeholder="1234567890"
              (input)="onPhoneInput($event)"
              [field]="registerForm.phoneNumber"
            />
          </mat-form-field>
        </div>

        <div class="row third">
          <mat-form-field appearance="fill" class="col">
            <mat-label>Country</mat-label>
            <mat-select
              [field]="registerForm.country"
              (selectionChange)="onCountrySelected($event.value)"
            >
              @for(country of countriesAndCities$ | async; track country.country) {
              <mat-option [value]="country.country">
                {{ country.country }}
              </mat-option>
              }
            </mat-select>
            @for(error of registerForm.country().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="col">
            <mat-label>City</mat-label>
            <mat-select [field]="registerForm.city" [disabled]="isCityDisabled()">
              @for(city of cities(); track city) {
              <mat-option [value]="city">
                {{ city }}
              </mat-option>
              }
            </mat-select>
            @for(error of registerForm.city().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="col">
            <mat-label>Street</mat-label>
            <input matInput type="text" [field]="registerForm.street" />
            @for(error of registerForm.street().errors(); track error){
            <mat-error>{{ error.message }}</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="actions">
          <button
            mat-flat-button
            color="primary"
            type="submit"
            class="register-button"
            [disabled]="registerForm().invalid()"
          >
            Register
          </button>
        </div>
      </form>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: var(--background, #f5f7fb);
      }
      .register-card {
        width: 920px;
        max-width: calc(100% - 2rem);
        padding: 1.25rem;
        box-sizing: border-box;
      }
      .register-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      /* GRID ROWS */
      .row {
        display: grid;
        gap: 1rem;
        width: 100%;
        align-items: start;
      }
      .row.first {
        grid-template-columns: repeat(3, minmax(180px, 1fr));
      }
      .row.second {
        grid-template-columns: repeat(3, minmax(180px, 1fr));
      }
      .row.second.split {
        grid-template-columns: repeat(2, minmax(220px, 1fr));
      }
      .row.third {
        grid-template-columns: repeat(3, minmax(180px, 1fr));
      }

      /* ensure form fields always fill their grid cell */
      mat-form-field.col {
        width: 100%;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
      }
      .register-button {
        align-self: flex-end;
      }

      @media (max-width: 900px) {
        .register-card {
          width: 100%;
        }
        .row.first,
        .row.second,
        .row.third {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class RegisterComponent {
  private _countriesService = inject(CountriesService);
  private _userService = inject(UserService);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  public countriesCodes$: Observable<CountriesDialCodesData[]> =
    this._countriesService.getCountriesDialCodes();
  public countriesAndCities$: Observable<CountriesAndCitiesData[]> =
    this._countriesService.getCountriesAndCities();
  selectedCountry = signal<string | null>(null);

  countriesAndCities = toSignal(this.countriesAndCities$, { initialValue: [] });

  cities = computed(() => {
    const country = this.selectedCountry();
    const countries = this.countriesAndCities();
    return countries.find((c) => c.country === country)?.cities ?? [];
  });
  isCityDisabled = computed(() => !this.selectedCountry());
  protected readonly registerData = signal<IRegisterForm>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: 'male',
    countryCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    street: '',
  });
  protected readonly registerForm = form(this.registerData, (path) => {
    required(path.email, { message: 'Email is required' });
    required(path.password, { message: 'Password is required' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters' });
    required(path.confirmPassword, { message: 'Confirm Password is required' });
    required(path.firstName, { message: 'First Name is required' });
    required(path.lastName, { message: 'Last Name is required' });
    required(path.countryCode, { message: 'Country Code is required' });
    required(path.phoneNumber, { message: 'Phone Number is required' });
    required(path.country, { message: 'Country is required' });
    required(path.city, { message: 'City is required' });
    required(path.street, { message: 'Street is required' });

    validate(path.confirmPassword, ({ value, valueOf }) => {
      const passwordValue = valueOf(path.password);
      const confirmValue = value();

      if (confirmValue !== passwordValue) {
        return customError({
          kind: 'password-mismatch',
          message: 'Passwords do not match',
        });
      }
      return undefined;
    });
  });

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  onCountrySelected(country: string) {
    if (this.selectedCountry() === country) return;
    this.selectedCountry.set(country);
    this.registerData.update((data) => ({
      ...data,
      city: '',
    }));
  }
  register() {
    const user = this._userService.create(this.registerForm().value());

    this.authStore.login(user);
    this.router.navigate(['/dashboard']);
  }
}
