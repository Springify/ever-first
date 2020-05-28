import { FileSharer } from '@byteowls/capacitor-filesharer';
import { Dependent } from './../model/dependent';
import { PensionMember } from './../model/pension-member';
import { DatePipe } from '@angular/common';
import { Customer } from './../model/customer';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Address } from '../model/address';

import { Plugins } from '@capacitor/core';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor(private datePipe: DatePipe) { }

  public exportToFile(customer: Customer): void {
    const customerWorkSheet = this.exportCustomerDetails(customer);
    const presentAddressWorkSheet = this.exportAddress(customer.presentAddress, 'presentAddress');
    const permanentAddressWorkSheet = this.exportAddress(customer.permanentAddress, 'permanentAddress');
    const previousAddressWorkSheet = this.exportAddress(customer.previousAddress, 'previousAddress');
    const pensionMemberWorkSheet = this.exportPensionMember(customer.pensionMember);
    const dependentsWorkSheet = this.exportDependents(customer.dependents);

    const workbook: XLSX.WorkBook = {
      Sheets: {
        'Customer Details': customerWorkSheet,
        'Present Address': presentAddressWorkSheet,
        'Permanent Address': permanentAddressWorkSheet,
        'Previous Address': previousAddressWorkSheet,
        'Pension Member': pensionMemberWorkSheet,
        'Dependents': dependentsWorkSheet,
      }, SheetNames: [
        'Customer Details',
        'Present Address',
        'Permanent Address',
        'Previous Address',
        'Pension Member',
        'Dependents'
      ]};

    // console.log(workbook);

    const fileName = customer.lastName + ', ' 
      + customer.firstName + ' ' + customer.middleName + ' ' + customer.suffix + '_' + new Date().getTime() + EXCEL_EXTENSION;
    const file = XLSX.write(workbook, { type: 'base64' });
    // console.log(file);

    Plugins.FileSharer.share({
      filename: fileName,
      base64Data: file,
      contentType: EXCEL_TYPE,
    }).then(() => {
      console.log('Exported');
    }).catch(error => console.log(error));
  }

  private exportCustomerDetails(customer: Customer): XLSX.WorkSheet {
    const worksheet = XLSX.utils.aoa_to_sheet([['First Name', 'Middle Name', 'Last Name', 'Suffix', 'Birth Date', 'Contact Number', 'Other Contact Number', 'Pension Source', 'Pension Type']]);

    XLSX.utils.sheet_add_aoa(worksheet, [[customer.firstName,
      customer.middleName,
      customer.lastName,
      customer.suffix,
      this.datePipe.transform(customer.birthDate, 'M/d/yyyy'),
      customer.contactNumber,
      customer.otherContactNumber,
      customer.pensionSource,
      customer.pensionType]],
      { origin: -1});

    // console.log('Customer worksheet', worksheet);
    return worksheet;
  }

  private exportAddress(address: Address, sheetName: string): XLSX.WorkSheet {
    const worksheet = XLSX.utils.aoa_to_sheet([['House No./Room No./Bldg No.', 'Street/Subdivision', 'Barangay/City', 'Region']]);
    XLSX.utils.sheet_add_aoa(worksheet, [[address.unitNumber, address.location, address.city, address.region]], { origin: -1});

    // console.log(sheetName, ' worksheet', worksheet);
    return worksheet;
  }

  private exportPensionMember(pensionMember: PensionMember): XLSX.WorkSheet {
    const worksheet = XLSX.utils.aoa_to_sheet([['First Name', 'Middle Name', 'Last Name', 'Suffix', 'Birth Date', 'Bank', 'Branch', 'Account Number', 'Remittance Date', 'Mode of Pension']]);
    XLSX.utils.sheet_add_aoa(worksheet, [[
      pensionMember.firstName,
      pensionMember.middleName,
      pensionMember.lastName,
      pensionMember.suffix,
      this.datePipe.transform(pensionMember.memberBirthDate, 'M/d/yyyy'),
      pensionMember.bank,
      pensionMember.branch,
      pensionMember.accountNumber,
      pensionMember.remittanceDate,
      pensionMember.modePension
    ]], { origin: -1 });

    // console.log('Pension Member worksheet', worksheet);
    return worksheet;
  }

  private exportDependents(dependents: Dependent[]): XLSX.WorkSheet {
    const worksheet = XLSX.utils.aoa_to_sheet([['First Name', 'Middle Name', 'Last Name', 'Suffix', 'Birth Date', 'Civil Status', 'Occupation']]);
    dependents.forEach(dependent => {
      XLSX.utils.sheet_add_aoa(worksheet, [[
        dependent.firstName,
        dependent.middleName,
        dependent.lastName,
        dependent.suffix,
        this.datePipe.transform(dependent.dependentBirthDate, 'M/d/yyyy'),
        dependent.civilStatus,
        dependent.occupation
      ]], { origin: -1 });
    });

    // console.log('Depedents worksheet', worksheet)
    return worksheet;
  }
}
