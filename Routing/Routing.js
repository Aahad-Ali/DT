import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from '../Components/Onboarding/Onboarding'
import LandLordSignUp from '../Components/LandLordSignUp/LandLordSignUp'
import LandLordSubscription from '../Components/LandLordSubscription/LandLordSubscription'
import PaymentMethodSignUp from '../Components/PaymentMethodSignUp/PaymentMethodSignUp'
import LandLordSignIn from '../Components/LandLordSignIn/LandLordSignIn'
import TenantSignUp from '../Components/TenantSignUp/TenantSignUp'
import TenantSignUpInvite from '../Components/TenantSignUpInvite/TenantSignUpInvite'
import TenantSignIn from '../Components/TenantSignIn/TenantSignIn'
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword'
import CheckYourEmail from '../Components/CheckYourEmail/CheckYourEmail'
import ResetPassword from '../Components/ResetPassword/ResetPassword'
import ResetPasswordTenant from '../Components/ResetPassword/ResetPasswordTenant'
import ResetPasswordProfessional from '../Components/ResetPassword/ResetPasswordProfessional'
import AccountingPage from '../Pages/AccountingPage/AccountingPage'
import WorkOrderPage from '../Pages/WorkOrderPage/WorkOrderPage'
import TenantReportsPage from '../Pages/TenantReportsPage/TenantReportsPage'
import TaskReportsPage from '../Pages/TaskReportsPage/TaskReportsPage'
import TaskDetailsPage from '../Pages/TaskDetailsPage/TaskDetailsPage'
import RenewLeasePage from '../Pages/RenewLeasePage/RenewLeasePage'
import PropertyReportPage from '../Pages/PropertyReportPage/PropertyReportPage'
import PropertyDetailsViewPage from '../Pages/PropertyDetailsViewPage/PropertyDetailsViewPage'
import PropertiesDashboardPage from '../Pages/PropertiesDashboardPage/PropertiesDashboardPage'
import NonRenewalPage from '../Pages/NonRenewalPage/NonRenewalPage'
import NewLeasePage from '../Pages/NewLeasePage/NewLeasePage'
import LeaseDetailsPage from '../Pages/LeaseDetailsPage/LeaseDetailsPage'
import InvoiceReportsPage from '../Pages/InvoiceReportsPage/InvoiceReportsPage'
import AllWorkOrderPage from '../Pages/AllWorkOrderPage/AllWorkOrderPage'
import AllTasksPage from '../Pages/AllTasksPage/AllTasksPage'
import AllProspectPage from '../Pages/AllProspectPage/AllProspectPage'
import AllLeasePage from '../Pages/AllLeasePage/AllLeasePage'
import AllFilePage from '../Pages/AllFilePage/AllFilePage'
import AddProspectDetailsPage from '../Pages/AddProspectDetailsPage/AddProspectDetailsPage'
import AddPropertyDetailsPage from '../Pages/AddPropertyDetailsPage/AddPropertyDetailsPage'
import AllReportsPage from '../Pages/AllReportsPage/AllReportsPage'
import EditFilePage from '../Pages/EditFilePage/EditFilePage'
import AddAccountPage from '../Pages/AddAccountPage/AddAccountPage'
import AccountDetailPage from '../Pages/AccountDetailPage/AccountDetailPage'
import MileagePage from '../Pages/MileagePage/MileagePage'
import AddMileagePage from '../Pages/AddMileagePage/AddMileagePage'
import SettingPage from '../Pages/SettingPage/SettingPage'
import SettingLoginInfo from '../Components/Setting/SettingLoginInfo/SettingLoginInfo'
import SettingCompanyInfo from '../Components/Setting/SettingCompanyInfo/SettingCompanyInfo'
import SettingRegion from '../Components/Setting/SettingRegion/SettingRegion'
import SettingAddUserRole from '../Components/Setting/SettingAddUserRole/SettingAddUserRole'
import SettingSubscription from '../Components/Setting/SettingSubscription/SettingSubscription'
import SettingPaymentMethod from '../Components/Setting/SettingPaymentMethod/SettingPaymentMethod'
import SettingPortfolio from '../Components/Setting/SettingPortfolio/SettingPortfolio'
import SettingLeadSource from '../Components/Setting/SettingLeadSource/SettingLeadSource'
import SettingUserInfo from '../Components/Setting/SettingUserInfo/SettingUserInfo'
import PropertiesUnitsEditPage from '../Pages/PropertiesUnitsEditPage/PropertiesUnitsEditPage'
import PropertiesUnitsViewPage from '../Pages/PropertiesUnitsViewPage/PropertiesUnitsViewPage'
import PaymentPage from '../Pages/PaymentPage/PaymentPage'
import PayableOverViewPage from '../Pages/PayableOverViewPage/PayableOverViewPage'
import CreatePayablePage from '../Pages/CreatePayablePage/CreatePayablePage'
import ChatPage from '../Pages/ChatPage/ChatPage'
import AllTenantsPage from '../Pages/AllTenantsPage/AllTenantsPage'
import AddTenantDetailsPage from '../Pages/AddTenantDetailsPage/AddTenantDetailsPage'
import ArchiveChatsPage from '../Pages/ArchiveChatsPage/ArchiveChatsPage'
import ArchiveChatUserPage from '../Pages/ArchiveChatUserPage/ArchiveChatUserPage'
import NotificationPage from '../Pages/NotificationPage/NotificationPage'
import PropertyAddAccountPage from '../Pages/PropertyAddAccountPage/PropertyAddAccountPage'
import Error404 from '../Components/Error404/Error404'
import TenantDashboardPage from '../Pages/TenantDashboardPage/TenantDashboardPage'
import HelpPage from '../Pages/HelpPage/HelpPage'
import TenantPassportPage from '../Pages/TenantPassportPage/TenantPassportPage'
import TenantPassportEditProfilePage from '../Pages/TenantPassportEditProfilePage/TenantPassportEditProfilePage'
import TenantPassportDetailsViewPage from '../Pages/TenantPassportDetailsViewPage/TenantPassportDetailsViewPage'
import ServiceProfessionalDashboardPage from '../Pages/ServiceProfessionalDashboardPage/ServiceProfessionalDashboardPage'
import LandLordDashboardPage from '../Pages/LandLordDashboardPage/LandLordDashboardPage'
import AddUnitDetailsPage from '../Pages/AddUnitDetailsPage/AddUnitDetailsPage'
import { AnimatePresence } from 'framer-motion'
import MobileChatBodyPage from '../Pages/MobileChatBodyPage/MobileChatBodyPage'
import PropertiesDeleteViewPage from '../Pages/PropertiesDeleteViewPage/PropertiesDeleteViewPage'
import AllVendorsPage from '../Pages/AllVendorsPage/AllVendorsPage'
import AddVendorDetailsPage from '../Pages/AddVendorDetailsPage/AddVendorDetailsPage'
import VendorDetailViewPage from '../Pages/VendorDetailViewPage/VendorDetailViewPage'
import EndLeasePage from '../Pages/EndLeasePage/EndLeasePage'
import NewFilePage from '../Pages/NewFilePage/NewFilePage'
import ContactsPage from '../Pages/ContactsPage/ContactsPage'
import AllServiceProfessionalPage from '../Pages/AllServiceProfessionalPage/AllServiceProfessionalPage'
import ProfessionalDetailsPage from '../Pages/ProfessionalDetailsPage/ProfessionalDetailsPage'
import LocalProfessionalDetailPage from '../Pages/LocalProfessionalDetailPage/LocalProfessionalDetailPage'
import MileageViewPage from '../Pages/MileageViewPage/MileageViewPage'
import DocumentationPage from '../Pages/DocumentationPage/DocumentationPage'
import MaintenancePage from '../Pages/MaintenancePage/MaintenancePage'
import AccountingMainPage from '../Pages/AccountingMainPage/AccountingMainPage'
import ServiceProfessionalSignUp from '../Components/ServiceProfessionalSignUp/ServiceProfessionalSignUp'
import ServiceProfessionalSignIn from '../Components/ServiceProfessionalSignIn/ServiceProfessionalSignIn'
import ServiceProfessionalSubscription from '../Components/ServiceProfessionalSubscription/ServiceProfessionalSubscription'
import CreateNewPage from '../Pages/CreateNewPage/CreateNewPage'
import AddNotesPage from '../Pages/AddNotesPage/AddNotesPage'
import ProspectDetailsPage from '../Pages/ProspectDetailsPage/ProspectDetailsPage'
import TenantForgotPassword from '../Components/ForgotPassword/TenantForgotPassword'
import ProfessionalForgotPassword from '../Components/ForgotPassword/ProfessionalForgotPassword'
import CheckYourEmailTenant from '../Components/CheckYourEmail/CheckYourEmailTenant'
import CheckYourEmailProfessional from '../Components/CheckYourEmail/CheckYourEmailProfessional'
import TenantPropertyDetailsViewPage from '../Pages/TenantPropertyDetailsViewPage/TenantPropertyDetailsViewPage'
import TenantDetailsViewPage from '../Pages/TenantDetailsViewPage/TenantDetailsViewPage'
import SettingPersonalInfo from '../Components/Setting/SettingPersonalInfo/SettingPersonalInfo'
import ChatBody from '../Components/Chat/ChatBody/ChatBody'
import TenantSetPassword from '../Components/TenantSetPassword/TenantSetPassword'
import TenantTaskPage from '../Pages/TenantTaskPage/TenantTaskPage'
import UserSetPassword from '../Components/UserSetPassword/UserSetPassword'
import CostumerQueriesPage from '../Pages/CostumerQueriesPage/CostumerQueriesPage'
import CostumerQueriesInnerPage from '../Pages/CostumerQueriesInnerPage/CostumerQueriesInnerPage'
import SettingAddUserDetails from '../Components/Setting/SettingAddUserDetails/SettingAddUserDetails'
import UserDetailsPage from '../Pages/UserDetailsPage/UserDetailsPage'
import AddUserRole from '../Components/AddUserRole/AddUserRole'
import AddUserRolePage from '../Pages/AddUserRolePage/AddUserRolePage'
import TenantPropertiesPage from '../Pages/TenantPropertiesPage/TenantPropertiesPage'
import TaskReportDetailPage from '../Pages/TaskReportDetailPage/TaskReportDetailPage'
import CustomSteps from '../Components/CustomSteps/CustomSteps'
import ServiceProfessionalPaymentMethod from '../Components/ServiceProfessionalPaymentMethod/ServiceProfessionalPaymentMethod'
import TenantPropertyUnitsViewPage from '../Pages/TenantPropertyUnitsViewPage/TenantPropertyUnitsViewPage'
import TenantTaskdetailsPage from '../Pages/TenantTaskDetailsPage/TenantTaskDetailsPage'
import EditPayablePage from '../Pages/EditPayablePage/EditPayablePage'
import TenantPassportProfilePage from '../Pages/TenantPassportProfilePage/TenantPassportProfilePage'
import ConvertProspectLeasePage from 'Pages/ConvertProspectLeasePage/ConvertProspectLeasePage'
import TenantQuestionsPage from 'Pages/TenantQuestionsPage/TenantQuestionsPage'
const Routing = () => {
    // check
    return (
        <>
            <BrowserRouter>
                <AnimatePresence>
                    <Routes>
                        {
                            localStorage.getItem("role") === null ?
                                <>
                                    {/* Home Route */}
                                    <Route exact path="/" element={<Onboarding />} />
                                    {/* Home End */}

                                    {/* Land Lord Route */}
                                    <Route exact path="/land-lord-signup" element={<LandLordSignUp />} />
                                    <Route exact path="/land-lord-subscription" element={<LandLordSubscription />} />
                                    <Route exact path="/land-lord-payment-method" element={<PaymentMethodSignUp />} />
                                    <Route exact path="/land-lord-sign-in" element={<LandLordSignIn />} />
                                    {/* Land Lord Route End */}

                                    {/* Tenants Routes */}
                                    <Route exact path="/tenant-sign-up" element={<TenantSignUp />} />
                                    <Route exact path="/tenant-sign-up-invite" element={<TenantSignUpInvite />} />
                                    <Route exact path="/tenant-sign-in" element={<TenantSignIn />} />
                                    {/* Tenants Routes End*/}

                                    {/* Validation Route */}
                                    <Route exact path="/landlord-check-your-email" element={<CheckYourEmail />} />
                                    <Route exact path="/tenant-check-your-email" element={<CheckYourEmailTenant />} />
                                    <Route exact path="/professional-check-your-email" element={<CheckYourEmailProfessional />} />
                                    <Route exact path="/landlord-forgot-password" element={<ForgotPassword />} />
                                    <Route exact path="/tenant-forgot-password" element={<TenantForgotPassword />} />
                                    <Route exact path="/professional-forgot-password" element={<ProfessionalForgotPassword />} />
                                    <Route exact path="/landlord-reset-password" element={<ResetPassword />} />
                                    <Route exact path="/tenant-reset-password" element={<ResetPasswordTenant />} />
                                    <Route exact path="/professional-reset-password" element={<ResetPasswordProfessional />} />
                                    <Route exact path="/set-password" element={<TenantSetPassword />} />
                                    <Route exact path="/set-user-password" element={<UserSetPassword />} />
                                    {/* Validation Route End */}
                                    {/* Error Page */}
                                    <Route exact path='*' element={<Error404 />} />
                                    {/* Error Page End */}

                                    {/* Service Professional Routes Start */}
                                    <Route exact path="/service-professional-sign-up" element={<ServiceProfessionalSignUp />} />
                                    <Route exact path="/service-professional-sign-in" element={<ServiceProfessionalSignIn />} />
                                    <Route exact path="/service-professional-subscription" element={<ServiceProfessionalSubscription />} />
                                    <Route exact path="/service-professional-payment-method" element={<ServiceProfessionalPaymentMethod />} />
                                    {/* Service Professional Routes End */}
                                </>
                                :
                                <>
                                    {/* Land Lord Portal Pages */}
                                    {
                                        localStorage.getItem('role') === 'landlord' || localStorage.getItem('role') === 'user' ?
                                            <>
                                                {/* Land Lord Route */}
                                                <Route exact path="/" element={<LandLordDashboardPage />} />
                                                <Route exact path="/dashboard" element={<LandLordDashboardPage />} />
                                                {/* Land Lord Route End */}
                                                {/* Properties Route */}
                                                <Route exact path="/properties-dashboard" element={<PropertiesDashboardPage />} />
                                                <Route exact path="/add-property-details" element={<AddPropertyDetailsPage />} />
                                                <Route exact path="/property-details-view" element={<PropertyDetailsViewPage />} />
                                                <Route exact path="/properties-units-edit" element={<PropertiesUnitsEditPage />} />
                                                <Route exact path="/properties-units-view" element={<PropertiesUnitsViewPage />} />
                                                <Route exact path="/property-add-account" element={<PropertyAddAccountPage />} />
                                                <Route exact path="/add-unit-details" element={<AddUnitDetailsPage />} />
                                                <Route exact path="/properties-delete-view" element={<PropertiesDeleteViewPage />} />
                                                {/* Properties Route End */}

                                                {/* Task Route */}
                                                <Route exact path="/all-task" element={<AllTasksPage />} />
                                                <Route exact path="/task-details" element={<TaskDetailsPage />} />
                                                {/* Task Route End */}

                                                {/* Work Order Route */}
                                                <Route exact path="/work-order" element={<WorkOrderPage />} />
                                                <Route exact path="/all-work-order" element={<AllWorkOrderPage />} />

                                                {/* Work Order Route End */}

                                                {/* Contacts Route Start */}
                                                <Route exact path="/contacts" element={<ContactsPage />} />
                                                {/* Contacts Route End */}
                                                {/* Documentation Route Start */}
                                                <Route exact path="/documentation" element={<DocumentationPage />} />
                                                {/* Documentation Route End */}
                                                {/* Maintenance Route Start */}
                                                <Route exact path="/maintenance" element={<MaintenancePage />} />
                                                {/* Maintenance Route End */}

                                                {/* Prospect Route */}
                                                <Route exact path="/all-prospect" element={<AllProspectPage />} />
                                                <Route exact path="/add-prospect-details" element={<AddProspectDetailsPage />} />
                                                <Route exact path="/prospect-details" element={<ProspectDetailsPage />} />

                                                {/* Prospect Route End */}

                                                {/* Tenant Route */}
                                                <Route exact path="/all-tenants" element={<AllTenantsPage />} />
                                                <Route exact path="/add-tenant-details" element={<AddTenantDetailsPage />} />
                                                <Route exact path="/tenant-details-view" element={<TenantDetailsViewPage />} />
                                                {/* Tenant Route End */}
                                                {/* Vendor Route */}
                                                <Route exact path="/all-vendor" element={<AllVendorsPage />} />
                                                <Route exact path="/add-vendor-details" element={<AddVendorDetailsPage />} />
                                                <Route exact path="/vendor-detail-view" element={<VendorDetailViewPage />} />
                                                {/* Vendor Route End */}

                                                {/* Service Professional Route End */}
                                                <Route exact path='/all-service-professional' element={<AllServiceProfessionalPage />} />
                                                <Route exact path='/all-service-professional-details' element={<ProfessionalDetailsPage />} />
                                                <Route exact path='/local-professional-details' element={<LocalProfessionalDetailPage />} />
                                                {/* Service Professional Route End */}

                                                {/* Lease Route  */}
                                                <Route exact path="/new-lease" element={<NewLeasePage />} />
                                                <Route exact path="/lease-detail" element={<LeaseDetailsPage />} />
                                                <Route exact path="/renew-lease" element={<RenewLeasePage />} />
                                                <Route exact path="/non-renew-lease" element={<NonRenewalPage />} />
                                                <Route exact path="/end-lease" element={<EndLeasePage />} />
                                                {/* Lease Route End  */}

                                                {/* Reports Route */}
                                                <Route exact path="/all-reports" element={<AllReportsPage />}>
                                                    <Route exact path="property-reports" element={<PropertyReportPage />} />
                                                    <Route exact path="tenant-reports" element={<TenantReportsPage />} />
                                                    <Route exact path="invoice-reports" element={<InvoiceReportsPage />} />
                                                    <Route exact path="task-reports" element={<TaskReportsPage />} />
                                                </Route>
                                                {/* Reports Route End */}

                                                {/* Files Route  */}
                                                <Route exact path="/all-files" element={<AllFilePage />} />
                                                <Route exact path="/edit-file" element={<EditFilePage />} />
                                                <Route exact path="/all-lease" element={<AllLeasePage />} />
                                                <Route exact path="/new-files" element={<NewFilePage />} />
                                                <Route exact path="/prospect-lease" element={<ConvertProspectLeasePage />} />
                                                {/* Files Route End */}
                                                {/* Files Route  */}
                                                <Route path='add-notes' element={<AddNotesPage />} />
                                                {/* Notes Route  End */}
                                                {/* Account Route */}

                                                <Route exact path="/accounting" element={<AccountingMainPage />} />
                                                <Route exact path="/all-accounts" element={<AccountingPage />} />
                                                <Route exact path="/add-account" element={<AddAccountPage />} />
                                                <Route exact path="/account-details" element={<AccountDetailPage />} />
                                                {/* Account Route End */}

                                                {/* Mileage Route */}
                                                <Route exact path="/mileage" element={<MileagePage />} />
                                                <Route exact path="/add-mileage" element={<AddMileagePage />} />
                                                <Route exact path="/mileage-view" element={<MileageViewPage />} />
                                                {/* Mileage Route End */}

                                                {/* Setting Route */}
                                                <Route exact path="/settings" element={<SettingPage />} >
                                                    <Route path='personal-info' element={<SettingPersonalInfo />} />
                                                    <Route path="login-info" element={<SettingLoginInfo />} />
                                                    <Route path="company-info" element={<SettingCompanyInfo />} />
                                                    <Route path="region" element={<SettingRegion />} />
                                                    <Route path="user-role" element={<SettingAddUserRole />} />
                                                    <Route path="subscription" element={<SettingSubscription />} />
                                                    <Route path="payment" element={<SettingPaymentMethod />} />
                                                    <Route path="portfolio" element={<SettingPortfolio />} />
                                                    <Route path="lead-source" element={<SettingLeadSource />} />
                                                    <Route path="user-info" element={<SettingUserInfo />} />
                                                    <Route path="add-user-details" element={<SettingAddUserDetails />} />
                                                </Route>
                                                {/* Setting Route End */}

                                                {/* Payable Route  */}
                                                <Route exact path="/payment" element={<PaymentPage />} />
                                                <Route exact path="/payable-overview" element={<PayableOverViewPage />} />
                                                <Route exact path="/create-payable" element={<CreatePayablePage />} />
                                                <Route exact path="/edit-payable" element={<EditPayablePage />} />
                                                {/* Payable Route End */}

                                                {/* Chat Route */}
                                                <Route exact path='/user-chat' element={<ChatPage />}>
                                                    <Route path="chat" element={<ChatBody />} />
                                                </Route>
                                                <Route exact path='/mobile-chat' element={<MobileChatBodyPage />} />
                                                <Route exact path="/archive-chat" element={<ArchiveChatsPage />} />
                                                <Route exact path="/archive-user" element={<ArchiveChatUserPage />} />
                                                {/* Chat Route End*/}

                                                {/* Notification Route */}
                                                <Route exact path="/notification" element={<NotificationPage />} />
                                                {/* Notification Route End */}

                                                {/* Help Route */}
                                                <Route exact path="/help" element={<HelpPage />} />
                                                {/* Help Route End */}
                                                {/* Error Page */}
                                                <Route exact path='*' element={<Error404 />} />
                                                {/* Error Page End */}

                                                {/* Create New Start */}
                                                <Route exact path="/create-new" element={<CreateNewPage />} />
                                                {/* Create New End */}

                                                {/* User Details Start */}
                                                <Route exact path="/user-details" element={<UserDetailsPage />} />
                                                {/* User Details End */}

                                                {/* Addd User role  */}
                                                <Route exact path="/add-user-role" element={<AddUserRolePage />} />
                                                {/* Addd User role end */}

                                                {/* Addd task report detail  */}
                                                <Route exact path="/task-report-detail" element={<TaskReportDetailPage />} />
                                                {/* Addd task report detail */}

                                                <Route exact path="/custom-steps" element={<CustomSteps />} />
                                            </>
                                            :
                                            ""
                                    }
                                    {/* Land Lord Portal Pages End */}

                                    {/* Tenant Portal Pages  */}
                                    {
                                        localStorage.getItem('role') === 'tenant' ?
                                            <>

                                                {/* Tenants Routes */}
                                                <Route exact path="/dashboard" element={<TenantDashboardPage />} />
                                                <Route exact path="/" element={<TenantDashboardPage />} />
                                                {/* Tenants Routes End*/}
                                                {/* Task Route */}
                                                <Route exact path="/all-task" element={<TenantTaskPage />} />
                                                <Route exact path="/task-details" element={<TenantTaskdetailsPage />} />
                                                {/* Task Route End */}

                                                {/* Setting Route */}
                                                <Route exact path="/settings" element={<SettingPage />} >
                                                    <Route path='personal-info' element={<SettingPersonalInfo />} />
                                                    <Route path="login-info" element={<SettingLoginInfo />} />
                                                    <Route path="company-info" element={<SettingCompanyInfo />} />
                                                    <Route path="region" element={<SettingRegion />} />
                                                    <Route path="user-role" element={<SettingAddUserRole />} />
                                                    <Route path="subscription" element={<SettingSubscription />} />
                                                    <Route path="payment" element={<SettingPaymentMethod />} />
                                                    <Route path="portfolio" element={<SettingPortfolio />} />
                                                    <Route path="lead-source" element={<SettingLeadSource />} />
                                                    <Route path="user-info" element={<SettingUserInfo />} />
                                                </Route>
                                                {/* Setting Route End */}

                                                {/* Payable Route  */}
                                                <Route exact path="/payment" element={<PaymentPage />} />
                                                <Route exact path="/payable-overview" element={<PayableOverViewPage />} />
                                                <Route exact path="/create-payable" element={<CreatePayablePage />} />
                                                {/* Payable Route End */}

                                                {/* Tenant Passport Route  */}
                                                <Route exact path="/tenant-passport" element={<TenantPassportPage />} />
                                                <Route exact path="/tenant-passport-edit-profile" element={<TenantPassportEditProfilePage />} />
                                                <Route exact path="/tenant-passport-details-view" element={<TenantPassportDetailsViewPage />} />
                                                <Route exact path="/tenant-passport" element={<TenantPassportPage />} />
                                                <Route exact path="/tenant-passport-edit-profile" element={<TenantPassportEditProfilePage />} />
                                                <Route exact path="/tenant-passport-profile" element={<TenantPassportProfilePage />} />
                                                <Route exact path="/tenant-questions" element={<TenantQuestionsPage />} />
                                                {/* Tenant Passport Route End */}

                                                {/* Chat Route */}
                                                <Route exact path='/user-chat' element={<ChatPage />}>
                                                    <Route path="chat" element={<ChatBody />} />
                                                </Route>
                                                <Route exact path='/mobile-chat' element={<MobileChatBodyPage />} />
                                                <Route exact path="/archive-chat" element={<ArchiveChatsPage />} />
                                                <Route exact path="/archive-user" element={<ArchiveChatUserPage />} />
                                                {/* Chat Route End*/}

                                                {/* Notification Route */}
                                                <Route exact path="/notification" element={<NotificationPage />} />
                                                {/* Notification Route End */}

                                                {/* Help Route */}
                                                <Route exact path="/help" element={<HelpPage />} />
                                                {/* Help Route End */}
                                                {/* Error Page */}
                                                <Route exact path='*' element={<Error404 />} />
                                                {/* Error Page End */}
                                                <Route exact path="/tenant-property-details-view" element={<TenantPropertyDetailsViewPage />} />
                                                <Route exact path="/tenant-properties" element={<TenantPropertiesPage />} />
                                                <Route exact path="/tenant-property-units-view" element={<TenantPropertyUnitsViewPage />} />
                                                <Route exact path="/tenant-task-details" element={<TenantTaskdetailsPage />} />
                                            </>
                                            :
                                            ""
                                    }

                                    {/* Service Professional Portal Pages */}
                                    {
                                        localStorage.getItem('role') === 'serviceprovider' ?
                                            <>
                                                {/* Land Lord Route */}
                                                <Route exact path="/" element={<ServiceProfessionalDashboardPage />} />
                                                <Route exact path="/dashboard" element={<ServiceProfessionalDashboardPage />} />
                                                {/* Land Lord Route End */}
                                                {/* Properties Route */}
                                                <Route exact path="/properties-dashboard" element={<PropertiesDashboardPage />} />
                                                <Route exact path="/add-property-details" element={<AddPropertyDetailsPage />} />
                                                <Route exact path="/property-details-view" element={<PropertyDetailsViewPage />} />
                                                <Route exact path="/properties-units-edit" element={<PropertiesUnitsEditPage />} />
                                                <Route exact path="/properties-units-view" element={<PropertiesUnitsViewPage />} />
                                                <Route exact path="/property-add-account" element={<PropertyAddAccountPage />} />
                                                {/* Properties Route End */}
                                                {/* Task Route */}
                                                <Route exact path="/all-task" element={<AllTasksPage />} />
                                                <Route exact path="/task-details" element={<TaskDetailsPage />} />
                                                {/* Task Route End */}
                                                {/* Work Order Route */}
                                                <Route exact path="/work-order" element={<WorkOrderPage />} />
                                                <Route exact path="/all-work-order" element={<AllWorkOrderPage />} />
                                                {/* Work Order Route End */}
                                                {/* Reports Route */}
                                                <Route exact path="/all-reports" element={<AllReportsPage />}>
                                                    <Route exact path="property-reports" element={<PropertyReportPage />} />
                                                    <Route exact path="tenant-reports" element={<TenantReportsPage />} />
                                                    <Route exact path="invoice-reports" element={<InvoiceReportsPage />} />
                                                    <Route exact path="task-reports" element={<TaskReportsPage />} />
                                                </Route>
                                                {/* Reports Route End */}
                                                {/* Files Route  */}
                                                <Route exact path="/all-files" element={<AllFilePage />} />
                                                <Route exact path="/edit-file" element={<EditFilePage />} />
                                                <Route exact path="/all-lease" element={<AllLeasePage />} />
                                                <Route exact path="/new-files" element={<NewFilePage />} />
                                                <Route exact path="/prospect-lease" element={<ConvertProspectLeasePage />} />
                                                {/* Files Route End */}
                                                {/* Account Route */}

                                                <Route exact path="/accounting" element={<AccountingPage />} />
                                                <Route exact path="/add-account" element={<AddAccountPage />} />
                                                <Route exact path="/account-details" element={<AccountDetailPage />} />
                                                {/* Account Route End */}

                                                {/* Mileage Route */}
                                                <Route exact path="/mileage" element={<MileagePage />} />
                                                <Route exact path="/add-mileage" element={<AddMileagePage />} />
                                                {/* Mileage Route End */}

                                                {/* Setting Route */}
                                                <Route exact path="/settings" element={<SettingPage />} >
                                                    <Route path='personal-info' element={<SettingPersonalInfo />} />
                                                    <Route path="login-info" element={<SettingLoginInfo />} />
                                                </Route>
                                                {/* Setting Route End */}

                                                {/* Payable Route  */}
                                                <Route exact path="/payment" element={<PaymentPage />} />
                                                <Route exact path="/payable-overview" element={<PayableOverViewPage />} />
                                                <Route exact path="/create-payable" element={<CreatePayablePage />} />
                                                {/* Payable Route End */}

                                                {/* Chat Route */}
                                                <Route exact path='/user-chat' element={<ChatPage />}>
                                                    <Route path="chat" element={<ChatBody />} />
                                                </Route>
                                                <Route exact path="/archive-chat" element={<ArchiveChatsPage />} />
                                                <Route exact path="/archive-user" element={<ArchiveChatUserPage />} />
                                                {/* Chat Route End*/}

                                                {/* Notification Route */}
                                                <Route exact path="/notification" element={<NotificationPage />} />
                                                {/* Notification Route End */}

                                                {/* Help Route */}
                                                <Route exact path="/help" element={<HelpPage />} />
                                                {/* Help Route End */}
                                                {/* Error Page */}
                                                <Route exact path='*' element={<Error404 />} />
                                                {/* Error Page End */}

                                                {/* Service Professional Start */}
                                                <Route exact path="/costumer-queries" element={<CostumerQueriesPage />} />
                                                <Route exact path="/costumer-queries-inner" element={<CostumerQueriesInnerPage />} />

                                                {/* Service Professional End */}
                                            </>
                                            :
                                            ""
                                    }
                                    {/* Service Professional Portal Pages End */}
                                </>
                        }
                    </Routes>
                </AnimatePresence>

            </BrowserRouter>
        </>
    )
}
export default Routing
