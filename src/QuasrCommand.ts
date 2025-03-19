import { Argument, Command, Option } from 'commander';

const tenantIdArgument = new Argument(
    '[tenant ID]',
    'Quasr tenant ID'
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
    }
}