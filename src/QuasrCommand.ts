import { Argument, Command, Option } from 'commander';
import { getBearerToken } from './utils.js';
import * as fs from 'fs';
import { cacheFilePath } from './tenant/tenant.js';

const tenantIdArgument = new Argument(
    '<tenant ID>',
    'Quasr tenant ID. To use a cached connection, only specify a name of the cached tenant, no other arguments.'
);

const clientIdArgument = new Argument(
    '[client ID]',
    'OAuth2.0 API Client ID'
);

const clientSecretArgument = new Argument(
    '[client Secret]',
    'OAuth2.0 API Client Secret'
);

const endpointOption = new Option(
    '-e, --endpoint <string>',
    'Quasr API Endpoint'
).default('api.quasr.io');

const tokenPathOption = new Option(
    '-t, --token-path <string>',
    'OAuth2.0 Token path'
).default('/oauth2/token')

const defaultArguments = [
    tenantIdArgument,
    clientIdArgument,
    clientSecretArgument,
];

const defaultOptions = [
    endpointOption,
    tokenPathOption,
];

/**
 * Default Quasr Command with default options
 */
export class QuasrCommand extends Command {

    tenantId: string;
    clientId: string;
    clientSecret: string;
    endpoint: string;
    tokenPath: string;
    token: string;

    constructor(name: string) {
        super(name);
        this.showHelpAfterError();
        this.configureHelp({
            sortSubcommands: true,
            sortOptions: true,
        });

        // Add the default arguments
        for (const argument of defaultArguments) {
            this.addArgument(argument);
        }

        // Add the default options
        for (const option of defaultOptions) {
            this.addOption(option);
        }
        this.tenantId = 'tenantId';
        this.clientId = 'clientId';
        this.clientSecret = 'clientSecret';
        this.endpoint = endpointOption.defaultValue;
        this.tokenPath = tokenPathOption.defaultValue;
        this.token = 'token';
    }

    async handleDefaultArgsAndOpts(...args: any) {
        const command = args.pop();
        const options = args.pop();

        if (command.args.length == 1) {
            const tenantName = command.args[0];
            let tenants = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
            const tenant = tenants.find((tenant: any) => tenant.name === tenantName);
            if (tenant) {
                this.tenantId = tenant.tenantId;
                this.clientId = tenant.clientId;
                this.clientSecret = tenant.clientSecret;
                this.tokenPath = tenant.tokenPath;
                this.endpoint = tenant.endpoint;
                this.token = tenant.access_token;
            } else {
                console.log("No tenant found with name: ", tenantName);
                process.exit(1);
            }
        } else if (command.args.length != command._args.length) {
            console.log('Not enough arguments. Required arguments: ', command._args.map((e: any) => e.name()).join(", "));
            process.exit(1);
        } else {
            this.tenantId = command.args[0];
            this.clientId = command.args[1];
            this.clientSecret = command.args[2];
            this.tokenPath = options.tokenPath;
            this.endpoint = options.endpoint;
            this.token = await getBearerToken(this.tenantId, this.endpoint, this.tokenPath, this.clientId, this.clientSecret);
        }
    }
}