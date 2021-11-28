import { ApplicationConfigurationDto } from "./models";
import request from "@/services/request";

let applicationConfiguration: ApplicationConfigurationDto = {
}

const getApplicationConfiguration = async (): Promise<ApplicationConfigurationDto> => {
    return request.get<ApplicationConfigurationDto>( '/api/abp/application-configuration').then(response => applicationConfiguration=response);
}

export  {
    applicationConfiguration,
    getApplicationConfiguration
}