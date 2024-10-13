import { Component } from '@angular/core';
import { PackageService } from '../../services/package/package.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-package',
  templateUrl: './delete-package.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class DeletePackageComponent {
  package_id: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private packageService: PackageService, private router: Router) {}

  deletePackage(): void {
    if (this.package_id) {
      this.packageService.deletePackage(this.package_id).subscribe({
        next: () => {
          this.successMessage = 'Package deleted successfully';
          this.router.navigate(['/list-packages']);
        },
        error: (error) => {
          this.errorMessage = 'Error deleting package: ' + error.message;
        }
      });
    }
  }
}
