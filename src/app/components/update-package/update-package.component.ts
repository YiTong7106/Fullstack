import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package/package.service';
import { Package } from '../../models/package';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class UpdatePackageComponent implements OnInit {
  
  packages: Package[] = [];
  selectedPackageId: string = '';
  package: Package = new Package('', '', 0, '', '');

  constructor(
    private packageService: PackageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }


  loadPackages(): void {
    this.packageService.getPackages().subscribe(packages => {
      this.packages = packages;
    });
  }

  loadPackageDetails(): void {
    const selectedPackage = this.packages.find(pkg => pkg._id === this.selectedPackageId);
    if (selectedPackage) {
      this.package = { ...selectedPackage };
    }
  }

  updatePackage(): void {
    if (this.package && this.package._id) {
      this.packageService.updatePackage(this.package._id, this.package).subscribe(() => {
        this.router.navigate(['/list-packages']);
      });
    }
  }
}
