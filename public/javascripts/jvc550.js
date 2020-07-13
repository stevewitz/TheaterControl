/**
 * Created by todd on 1/15/2018.
 */
const net = require('net');

//const HOST = '71.38.39.202'

var commandType;
var returnedInfo;
var currentCommand;
var currentCommandName;

//const operation_POWER_STATE_ON =        Buffer.from([0x21,0x89,0x01,0x50,0x57,0x31,0x0a]);
//const operation_POWER_STATE_OFF =       Buffer.from([0x21,0x89,0x01,0x50,0x57,0x30,0x0a]);

//const reference_HDMI =                  Buffer.from([0x3f,0x89,0x01,0x49,0x50,0x0a]);
//const operation_HDMI_1 =                Buffer.from([0x21,0x89,0x01,0x49,0x50,0x36,0x0a]);
//const operation_HDMI_2 =                Buffer.from([0x21,0x89,0x01,0x49,0x50,0x37,0x0a]);

//const reference_PICTURE_MODE =          Buffer.from([0x3f,0x89,0x01,0x50,0x4d,0x50,0x4d,0x0a]);
//const operation_PICTURE_MODE_FILM =     Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x30,0x0a]);
//const operation_PICTURE_MODE_CINEMA=    Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x31,0x0a]);
//const operation_PICTURE_MODE_ANIMATION= Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x32,0x0a]);
//const operation_PICTURE_MODE_NATURAL  = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x33,0x0a]);
//const operation_PICTURE_MODE_THX  =     Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x36,0x0a]);
//const operation_PICTURE_MODE_REF  =     Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x43,0x0a]);
//const operation_PICTURE_MODE_TV  =      Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x44,0x0a]);
//const operation_PICTURE_MODE_HDR  =     Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x45,0x0a]);
//const operation_PICTURE_MODE_USER4  =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x46,0x0a]);
//const operation_PICTURE_MODE_USER5  =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x31,0x30,0x0a]);
//const operation_PICTURE_MODE_USER6 =    Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x31,0x31,0x0a]);

//const reference_LENS_APERTURE =         Buffer.from([0x3f,0x89,0x01,0x50,0x4d,0x44,0x49,0x0a]);
//const operation_LENS_APERTURE_OFF =     Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x44,0x49,0x30,0x0a]) ;
//const operation_LENS_APERTURE_AUTO1 =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x44,0x49,0x31,0x0a]) ;
//const operation_LENS_APERTURE_AUTO2 =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x44,0x49,0x32,0x0a]) ;

// const reference_COLOR_PROFILE =         Buffer.from([0x3f,0x89,0x01,0x50,0x4d,0x50,0x52,0x0a]);
// const operation_COLOR_PROFILE_OFF =     Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x30,0x0a]);
// const operation_COLOR_PROFILE_FILM1 =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x31,0x0a]);
// const operation_COLOR_PROFILE_FILM2 =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x32,0x0a]);
// const operation_COLOR_PROFILE_STANDARD =Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x33,0x0a]);
// const operation_COLOR_PROFILE_CINEMA1 = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x34,0x0a]);
// const operation_COLOR_PROFILE_CINEMA2 = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x35,0x0a]);
// const operation_COLOR_PROFILE_ANAME1 =  Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x36,0x0a]);
// const operation_COLOR_PROFILE_ANAME2 =  Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x37,0x0a]);
// const operation_COLOR_PROFILE_VIDEO =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x38,0x0a]);
// const operation_COLOR_PROFILE_XVCOLOR = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x39,0x0a]);
// const operation_COLOR_PROFILE_3DCINEMA =Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x43,0x0a]);
// const operation_COLOR_PROFILE_THX =     Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x44,0x0a]);
// const operation_COLOR_PROFILE_BT2020 =  Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x45,0x0a]);
// const operation_COLOR_PROFILE_REC2020NF = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x46,0x0a]);
// const operation_COLOR_PROFILE_REC709NF = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x30,0x0a]);
// const operation_COLOR_PROFILE_CUSTOM4 = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x31,0x0a]);
// const operation_COLOR_PROFILE_CUSTOM5 = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x32,0x0a]);
// const operation_COLOR_PROFILE_FILM3 =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x33,0x0a]);
// const operation_COLOR_PROFILE_3DVIDEO = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x34,0x0a]);
// const operation_COLOR_PROFILE_3DANAAME= Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x35,0x0a]);
// const operation_COLOR_PROFILE_3DFILM =  Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x45,0x0a]);
// const operation_COLOR_PROFILE_3DTHX =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x32,0x30,0x0a]);
// const operation_COLOR_PROFILE_REFERENCE=Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x32,0x31,0x0a]);
// const operation_COLOR_PROFILE_CUSTOM6 = Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x32,0x32,0x0a]);

// const reference_GAMMA_TABLE =           Buffer.from([0x3f,0x89,0x01,0x50,0x4d,0x47,0x54,0x0a]);
// const operation_GAMMA_TABLE_NORMAL =    Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x30,0x0a]);
// const operation_GAMMA_TABLE_A =         Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x31,0x0a]);
// const operation_GAMMA_TABLE_B =         Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x32,0x0a]);
// const operation_GAMMA_TABLE_C =         Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x33,0x0a]);
// const operation_GAMMA_TABLE_CUSTOM1 =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x34,0x0a]);
// const operation_GAMMA_TABLE_CUSTOM2 =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x35,0x0a]);
// const operation_GAMMA_TABLE_CUSTOM3 =   Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x36,0x0a]);
// const operation_GAMMA_TABLE_D =         Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x37,0x0a]);
// const operation_GAMMA_TABLE_FILM1 =     Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x41,0x0a]);
// const operation_GAMMA_TABLE_FILM2=      Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x42,0x0a]);

           //const reference_MASK =                   Buffer.from([0x3f,0x89,0x01,0x49,0x53,0x4d,0x41,0x0a]); /////////not available
// const operation_MASK_CUSTOM1 =           Buffer.from([0x21,0x89,0x01,0x49,0x53,0x4d,0x41,0X30,0x0a]);
// const operation_MASK_CUSTOM2 =           Buffer.from([0x21,0x89,0x01,0x49,0x53,0x4d,0x41,0X31,0x0a]);
// const operation_MASK_OFF =               Buffer.from([0x21,0x89,0x01,0x49,0x53,0x4d,0x41,0X32,0x0a]);
// const operation_MASK_CUSTOM3 =           Buffer.from([0x21,0x89,0x01,0x49,0x53,0x4d,0x41,0X33,0x0a]);

// const reference_LENS_MEMORY =            Buffer.from([0x3f,0x89,0x01,0x49,0x4e,0x4d,0x4C,0x0a]);
// const operation_LENS_MEMORY_1 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X30,0x0a]);
// const operation_LENS_MEMORY_2 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X31,0x0a]);
// const operation_LENS_MEMORY_3 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X32,0x0a]);
// const operation_LENS_MEMORY_4 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X33,0x0a]);
// const operation_LENS_MEMORY_5 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X34,0x0a]);
// const operation_LENS_MEMORY_6 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X35,0x0a]);
// const operation_LENS_MEMORY_7 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X36,0x0a]);
// const operation_LENS_MEMORY_8 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X37,0x0a]);
// const operation_LENS_MEMORY_9 =          Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X38,0x0a]);
// const operation_LENS_MEMORY_10 =         Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X39,0x0a]);

//const reference_CURRENT_STATUS =         Buffer.from([0x3f,0x89,0x01,0x53,0x43,0x0a]);

const reference_LAMP_POWER =             Buffer.from([0x3f, 0x89,0x01,0x50,0x4d,0x46,0x50,0x0a]);
const operation_LAMP_POWER_NORMAL =      Buffer.from([0x3f, 0x89,0x01,0x50,0x4d,0x46,0x50,0x30,0x0a]);
const operation_LAMP_POWER_HIGH =        Buffer.from([0x3f, 0x89,0x01,0x50,0x4d,0x46,0x50,0x31,0x0a]);

const reference_FILM_MODE_SWITCH =       Buffer.from([0x3f,0x89,0x01,0x49,0x53,0x46,0x4D,0x0a]);//doesnt work

const reference_INPUT_DISPLAY =           Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x49,0x4e,0x0a]);

const reference_SOURCE_DISPLAY =          Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x49,0x53,0x0a]);

const reference_HOR_RES_DISPLAY =         Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x52,0x48,0x0a]);

const reference_VERT_RES_DISPLAY =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x52,0x56,0x0a]);

const reference_HOR_FREQ_DISPLAY =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x46,0x48,0x0a]);

const reference_VERT_FREQ_DISPLAY =       Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x46,0x56,0x0a]);

//const reference_DEEP_COLOR_DISPLAY =      Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x44,0x43,0x0a]);//changes to 2 if hdr?

const reference_COLOR_SPACE_DISPLAY =     Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x58,0x56,0x0a]);

const reference_LAMP_TIME_DISPLAY =       Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x4C,0x54,0x0a]);

const reference_SOFT_VER_DISPLAY =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);

const reference_CAL_INFO_DISPLAY =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x43,0x49,0x0a]);//doesnt work

const reference_A =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const reference_B =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const reference_C =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const reference_D =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_A =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_B =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_C =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_D =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_E =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_F =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_G =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_H =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);
const operation_I =        Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x53,0x56,0x0a]);


const recreateDevice = true;


if (recreateDevice){
    var device ={
        type:"JVC550",
        id: "JVC550",
        name: "JVC550",
        commands:[
            {   name:'reference_POWER_STATE',
                code:Buffer.from([0x3f,0x89,0x01,0x50,0x57,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_POWER_STATE_ON',
                code:Buffer.from([0x21,0x89,0x01,0x50,0x57,0x31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_POWER_STATE_OFF',
                code:Buffer.from([0x21,0x89,0x01,0x50,0x57,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_HDMI',
                code:Buffer.from([0x3f,0x89,0x01,0x49,0x50,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_HDMI_1',
                code:Buffer.from([0x21,0x89,0x01,0x49,0x50,0x36,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_HDMI_2',
                code:Buffer.from([0x21,0x89,0x01,0x49,0x50,0x37,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_PICTURE_MODE',
                code:Buffer.from([0x3f,0x89,0x01,0x50,0x4d,0x50,0x4d,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_FILM',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_CINEMA',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_ANIMATION',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x32,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_NATURAL',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x33,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_THX',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x36,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_REF',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x43,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_TV',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x44,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_HDR',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x45,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_HDR_OPPO',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x30,0x46,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_USER5',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x31,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_PICTURE_MODE_USER6',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x4d,0x31,0x31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_LENS_APERTURE',
                code: Buffer.from([0x3f,0x89,0x01,0x50,0x4d,0x44,0x49,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_APERTURE_OFF',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x44,0x49,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_APERTURE_AUTO1 ',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x44,0x49,0x31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_APERTURE_AUTO2',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x44,0x49,0x32,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_COLOR_PROFILE',
                code: Buffer.from([0x3f,0x89,0x01,0x50,0x4d,0x50,0x52,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_OFF',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_FILM1',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_FILM2' ,
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x32,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_STANDARD',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x33,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_CINEMA1',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x34,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_CINEMA2',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x35,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_ANAME1',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x36,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_ANAME2',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x37,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_VIDEO',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x38,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_XVCOLOR',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x39,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_3DCINEMA',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x43,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_THX',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x44,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_BT2020',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x45,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_REC2020NF',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x30,0x46,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_REC709NF',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_CUSTOM4',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_CUSTOM5',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x32,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_FILM3',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x33,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_3DVIDEO',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x34,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_3DANAAME',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x35,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_3DFILM',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x31,0x45,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_3DTHX',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x32,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_REFERENCE',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x32,0x31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_COLOR_PROFILE_CUSTOM6',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x50,0x52,0x32,0x32,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_GAMMA_TABLE',
                code: Buffer.from([0x3f,0x89,0x01,0x50,0x4d,0x47,0x54,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_NORMAL',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_A',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_B',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x32,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_C',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x33,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_CUSTOM1',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x34,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_CUSTOM2',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x35,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_CUSTOM3',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x36,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_D',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x37,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_FILM1',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x41,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_GAMMA_TABLE_FILM2',
                code: Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x42,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_MASK_CUSTOM1',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x53,0x4d,0x41,0X30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_MASK_CUSTOM2',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x53,0x4d,0x41,0X31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_MASK_OFF',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x53,0x4d,0x41,0X32,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_MASK_CUSTOM3',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x53,0x4d,0x41,0X33,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_LENS_MEMORY',
                code: Buffer.from([0x3f,0x89,0x01,0x49,0x4e,0x4d,0x4C,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_1',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_2',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X31,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_3',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X32,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_4',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X33,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_5',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X34,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_6',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X35,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_7',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X36,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_8',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X37,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_9',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X38,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LENS_MEMORY_10',
                code: Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X39,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_CURRENT_STATUS',
                code: Buffer.from([0x3f,0x89,0x01,0x53,0x43,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_DEEP_COLOR_DISPLAY',
                code: Buffer.from([0x3f,0x89,0x01,0x49,0x46,0x44,0x43,0x0a]),
                sendto:"jvc550"
            },
            {   name:'reference_LAMP_POWER',
                code: Buffer.from([0x3f, 0x89,0x01,0x50,0x4d,0x4c,0x50,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LAMP_POWER_NORMAL',
                code: Buffer.from([0x21, 0x89,0x01,0x50,0x4d,0x4c,0x50,0x30,0x0a]),
                sendto:"jvc550"
            },
            {   name:'operation_LAMP_POWER_HIGH ',
                code: Buffer.from([0x21, 0x89,0x01,0x50,0x4d,0x4c,0x50,0x31,0x0a]),
                sendto:"jvc550"
            }





        ],
        events:[
            {name:'reference_POWER_STATE'},
            {name:'reference_HDMI'},
            {name:'reference_PICTURE_MODE'},
            {name:'reference_LENS_APERTURE'},
            {name:'reference_COLOR_PROFILE'},
            {name:'reference_GAMMA_TABLE'},
            {name:'reference_LENS_MEMORY'},
            {name:'reference_CURRENT_STATUS'},
            {name:'reference_DEEP_COLOR_DISPLAY'},
            {name:'reference_LAMP_POWER'}
        ]
    }
    ll.writething(device,true)

}

function sendCommand(command,name){
    currentCommand = command;
    currentCommandName = name;
    const client = net.createConnection({ port: 20554,host: HOST}, () => {

        //'connect' listener
        console.log('connected to server!');
        //   client.write('world!\r\n');
    });
    client.on('data', (data) => {
        sdata  = data.toString();
        switch (sdata) {
            case 'PJ_OK' :
                console.log('PJ_OK received - sending PJREQ');
                client.write('PJREQ');
                console.log("*********************************************************************************");
                break;
            case 'PJACK' :
                console.log('PJACK received send command:' + command);
                //send command here

                client.write(command);
                console.log("*********************************************************************************");
                commandType = command[0];
                break;
            default:
                switch (commandType) {

                    case(0x3f): // this is a Reference Command (?) expect 2 seperate packets back
                        //scan buffer for 2 0x0a to see if both messages are concatonated
                        if (data[0] == 0x06 && data.length == 6) { // we have an ack
                            //do nothing for now, but commands was acknowledged
                        }
                        if (data[0] == 0x40) {
                            if (data[data.length - 1] == 0x0a) {
                                //we have a valid command
                                returnedInfo = data;
                                console.log("received Reference data as separate data.  Data is: " + returnedInfo.toString()+"  Reference Sent: "+ currentCommand.toString());
                                dataFromProjector(currentCommandName,returnedInfo);                            }
                            else {
                                //command returned invalid date
                                console.log("received requested data as sparate data, but it was invalid  Command sent was: " + currentCommand.toString());
                            }

                            client.end();
                        }
                        if (data[0] == 0x06 && data.length > 6) {

                            if (data[6] == 0x40) { //this is the data we want
                                if (data[data.length - 1] == 0x0a) {
                                    returnedInfo = data.slice(6, data.length);
                                    console.log("received Reference data as concatinated data.  Data is: " + returnedInfo.toString()+"  Reference Sent: "+ currentCommand.toString());
                                    dataFromProjector(currentCommandName,returnedInfo)
                                }
                            }
                            else {
                                //command returned invalid date
                                console.log("received requested data as concatonated data, but it was invalid  Command sent was: " + currentCommand.toString());
                            }
                            client.end();
                        }
                        break;

                    case (0x21): // this is an ack for a operation
                        if (data[data.length - 1] == 0x0a) {//valid ack
                            console.log("Reveived valid ACK from operation command");
                        }
                        else {
                            console.log("Invalid data from operation command");
                        }

                        client.end();
                        break;

                    default:
                        console.log("Received invalid data unknown type.  First bute of returned string is: " + data[0]);
                        client.end();
                        console.log("*********************************************************************************");
                        console.log("Command" + command);
                }

        }
    });

    client.on('error', (error) => {
        console.log("error in JVC Client: " + command + "  " + name + ' Error:'+error) ;
        client.end();

    });


client.on('end', () => {
    console.log('disconnected from projector'); // now we can send additional commands
});

}

// sendCommand(command_POWER_STATE,function(data){
//  console.log("STRING:"+sdata);
// console.log('Data'+data[0])
// console.log(data.toString('hex'));
// console.log('Done')
// })

// sendCommand(operation_GAMMA_TABLE_CUSTOM1,function(data){
//     console.log("STRING:"+sdata);
//     console.log('Data'+data[0])
//     console.log(data.toString('hex'));
//     console.log('Done')
//     //setTimeout(function(){sendCommand(command_HDMI2)},2000)
// });
exports.execCommand = function(obj,cmd){
  //  console.log("+++ cmd(stringify)_"+JSON.stringify(cmd))


   // console.log("cmd.code" + cmd.code );
 //   console.log("cmd.code.data" + cmd.code.data);

    if (cmd.code.data){
        sendCommand(Buffer.from(cmd.code.data),cmd.name)

    } else
    {
        sendCommand(cmd.code,cmd.name)
    }


        //console.log(cmd.code)
    // switch (cmd.name) {
    //     case 'reference_POWER_STATE':
    //         sendCommand(Buffer.from([0x3f,0x89,0x01,0x50,0x57,0x0a]),"reference_POWER_STATE");
    //
    //
    //
    //
    //
    // }

    console.log ('exec jvc550 command:'+JSON.stringify(cmd))

};

function dataFromProjector (cmdName,data){
    var o = ll.getthingbyid('JVC550');
    var state = ''
    switch (cmdName){
        case 'reference_POWER_STATE':
            switch (data[5]){
                case 0x30:
                      state = 'Standby';
                      break;
                case 0x31:
                    state = 'Power On';
                    break;
                case 0x32:
                    state = 'Cooling';
                    break;
                case 0x34:
                    state = 'Error';
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;

            }
            o.power_state = state
            break;
        case 'reference_HDMI':
            switch(data[5]){
                case 0x36:
                    state = "HDMI 1"
                    break;
                case 0x37:
                    state = "HDMI 2"
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;
            }
            o.video_input = state
            break;
        case 'reference_PICTURE_MODE':
            switch(data[5]*256+data[6]) {
                case 0x3030:
                    state = "FILM"
                    break;
                case 0x3031:
                    state = "CINEMA"
                    break;
                case 0x3032:
                    state = "ANIMATION"
                    break;
                case 0x3033:
                    state = "NATURAL"
                    break;
                case 0x3036:
                    state = "THX"
                    break;
                case 0x3043:
                    state = "REF"
                    break;
                case 0x3044:
                    state = "TV"
                    break;
                case 0x3045:
                    state = "HDR"
                    break;
                case 0x3046:
                    state = "USER4"
                    break;
                case 0x3130:
                    state = "USER5"
                    break;
                case 0x3131:
                    state = "USER6"
                    break;

                default:
                    state = 'Unknown:' + data[5];
                    break;

            }
            o.video_input = state
            break;
        case 'reference_LENS_APERTURE':
            switch(data[5]){
                case 0x30:
                    state = "OFF"
                    break;
                case 0x31:
                    state = "AUTO1"
                    break;
                case 0x32:
                    state = "AUTO2"
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;
            }
            o.video_input = state
            break;
        case 'reference_COLOR_PROFILE':
            switch(data[5]*256+data[6]) {
                case 0x3030:
                    state = "OFF"
                    break;
                case 0x3031:
                    state = "FILM1"
                    break;
                case 0x3032:
                    state = "FILM2"
                    break;
                case 0x3033:
                    state = "STANDARD"
                    break;
                case 0x3034:
                    state = "CINEMA1"
                    break;
                case 0x3035:
                    state = "CINEMA2"
                    break;
                case 0x3036:
                    state = "ANAME1"
                    break;
                case 0x3037:
                    state = "ANAME2"
                    break;
                case 0x3038:
                    state = "VIDEO"
                    break;
                case 0x3039:
                    state = "XVCOLOR"
                    break;
                case 0x3043:
                    state = "3DCINEMA"
                    break;
                case 0x3044:
                    state = "THX"
                    break;
                case 0x3045:
                    state = "BT2020"
                    break;
                case 0x3046:
                    state = "REC2020NF"
                    break;
                case 0x3130:
                    state = "REC709NF"
                    break;
                case 0x3131:
                    state = "CUSTOM4"
                    break;
                case 0x3132:
                    state = "CUSTOM5"
                    break;
                case 0x3133:
                    state = "FILM3"
                    break;
                case 0x3134:
                    state = "3DVIDEO"
                    break;
                case 0x3135:
                    state = "3DANAAME"
                    break;
                case 0x3145:
                    state = "3DFILM"
                    break;
                case 0x3230:
                    state = "3DTHX"
                    break;
                case 0x3231:
                    state = "REFERENCE"
                    break;
                case 0x3232:
                    state = "CUSTOM6"
                    break;
                default:
                    state = 'Unknown:' + data[5];
                    break;

            }
            o.video_input = state
            break;
        case 'reference_LENS_MEMORY':
        switch(data[5]){
            case 0x30:
                state = "LENS_MEMORY_1"
                break;
            case 0x31:
                state = "LENS_MEMORY_2"
                break;
            case 0x32:
                state = "LENS_MEMORY_3"
                break;
            case 0x33:
                state = "LENS_MEMORY_4"
                break;
            case 0x34:
                state = "LENS_MEMORY_5"
                break;
            case 0x35:
                state = "LENS_MEMORY_6"
                break;
            case 0x36:
                state = "LENS_MEMORY_7"
                break;
            case 0x37:
                state = "LENS_MEMORY_8"
                break;
            case 0x38:
                state = "LENS_MEMORY_9"
                break;
            case 0x39:
                state = "LENS_MEMORY_10"
                break;
            default:
                state = 'Unknown:'+data[5];
                break;
        }
        o.video_input = state
        break;
        case 'reference_GAMMA_TABLE':
            switch(data[5]){
                case 0x30:
                    state = "NORMAL"
                    break;
                case 0x31:
                    state = "A"
                    break;
                case 0x32:
                    state = "B"
                    break;
                case 0x33:
                    state = "C"
                    break;
                case 0x34:
                    state = "CUSTOM1"
                    break;
                case 0x35:
                    state = "CUSTOM2"
                    break;
                case 0x36:
                    state = "CUSTOM3"
                    break;
                case 0x37:
                    state = "D"
                    break;
                case 0x41:
                    state = "FILM1"
                    break;
                case 0x42:
                    state = "FILM2"
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;
            }
            o.video_input = state
            break;
        case 'reference_DEEP_COLOR_DISPLAY':
            switch(data[5]){
                case 0x30:
                    state = "8bit"
                    break;
                case 0x31:
                    state = "10bit"
                    break;
                case 0x32:
                    state = "12bit"
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;
            }
            o.video_input = state
            break;
        case 'reference_CURRENT_STATUS':
            switch(data[5]){
                case 0x60:
                    state = "8bit"
                    break;
                case 0x61:
                    state = "10bit"
                    break;
                case 0x62:
                    state = "12bit"
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;
            }
            o.video_input = state
            break;
        case 'reference_LAMP_POWER':
            switch(data[5]){
                case 0x30:
                    state = "NORMAL"
                    break;
                case 0x31:
                    state = "HIGH"
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;
            }
            o.video_input = state
            break;


    }


    ll.writething(o,true); // update the thing
    rp.event("JVC550",cmdName,state) // send the event


}