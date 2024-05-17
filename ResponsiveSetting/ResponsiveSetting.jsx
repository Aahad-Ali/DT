import { ConfigProvider, Tabs } from 'antd'
import React from 'react'
import SettingPersonalInfo from '../Setting/SettingPersonalInfo/SettingPersonalInfo';
import SettingSubscription from '../Setting/SettingSubscription/SettingSubscription';
import SettingCompanyInfo from '../Setting/SettingCompanyInfo/SettingCompanyInfo';
import SettingRegion from '../Setting/SettingRegion/SettingRegion';
import SettingAddUserRole from '../Setting/SettingAddUserRole/SettingAddUserRole';
import SettingPaymentMethod from '../Setting/SettingPaymentMethod/SettingPaymentMethod';
import SettingPortfolio from '../Setting/SettingPortfolio/SettingPortfolio';
import SettingLeadSource from '../Setting/SettingLeadSource/SettingLeadSource';
import SettingUserInfo from '../Setting/SettingUserInfo/SettingUserInfo';
const { TabPane } = Tabs;
const ResponsiveSetting = () => {
    return (
        <>
            <div className="container-fluid p-3">
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                inkBarColor: "#EF6B3E",
                                itemSelectedColor: "#EF6B3E",
                                itemHoverColor: "#EF6B3E",
                                titleFontSize: 15,
                                horizontalItemGutter: window.innerWidth <= 768 ? 10 : 60

                            }
                        }
                    }}
                >
                    <Tabs>
                        <TabPane tab="Personal Information" key="1">
                            <SettingPersonalInfo />
                        </TabPane>
                        <TabPane tab="Login & Password" key="2">
                            <SettingSubscription />
                        </TabPane>
                        <TabPane tab="Company Information" key="3">
                            <SettingCompanyInfo />
                        </TabPane>
                        <TabPane tab="Region & Currency" key="4">
                            <SettingRegion />
                        </TabPane>
                        <TabPane tab="User" key="5">
                            <SettingUserInfo />
                        </TabPane>
                        <TabPane tab="User Roles" key="6">
                            <SettingAddUserRole />
                        </TabPane>
                        <TabPane tab="Subscription" key="7">
                            <SettingSubscription />
                        </TabPane>
                        <TabPane tab="Payment Method" key="8">
                            <SettingPaymentMethod />
                        </TabPane>
                        <TabPane tab="Portfolios" key="9">
                            <SettingPortfolio />
                        </TabPane>
                        <TabPane tab="Lead Generation Channel" key="10">
                            <SettingLeadSource />
                        </TabPane>
                    </Tabs>
                </ConfigProvider>
            </div>
        </>
    )
}

export default ResponsiveSetting
