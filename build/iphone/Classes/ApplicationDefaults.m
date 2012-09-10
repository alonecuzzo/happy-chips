/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"of8CTOaKjwIeN3WZdC9rok2TaidOHnMi"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"Vqhbddz2DzdC4nJrohYczIb6buQM9eUX"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"b9RMGb1ai2Nef1WwdbPaFmEjqU2QgENB"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"NI8bqwZAMTStzBYeYyezSKSPsfQQbDgo"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"NWaqpI72N8HbNG3zoYIjBJ6r0ctoBPMs"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"g8IZYGmQ8EfuyhCpcc0l2b36awOzbEaP"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
