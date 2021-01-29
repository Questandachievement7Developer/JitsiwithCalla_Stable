admins = {
    "focus@auth.meet.jitsi",
    "jvb@auth.meet.jitsi"
}

plugin_paths = { "/prosody-plugins/", "/prosody-plugins-custom" }
http_default_host = "meet.jitsi"















consider_bosh_secure = true;

-- Deprecated in 0.12
-- https://github.com/bjc/prosody/commit/26542811eafd9c708a130272d7b7de77b92712de




  

cross_domain_websocket = { "https://localhost:8443","meet.jitsi" }
cross_domain_bosh = { "https://localhost:8443","meet.jitsi" }


VirtualHost "meet.jitsi"

    -- https://github.com/jitsi/docker-jitsi-meet/pull/502#issuecomment-619146339
    
    authentication = "token"
    
    app_id = ""
    app_secret = ""
    allow_empty_token = true

    ssl = {
        key = "/config/certs/meet.jitsi.key";
        certificate = "/config/certs/meet.jitsi.crt";
    }
    modules_enabled = {
        "bosh";
        
        "websocket";
        "smacks"; -- XEP-0198: Stream Management
        
        "pubsub";
        "ping";
        "speakerstats";
        "conference_duration";
        
        
        
    }

    

    speakerstats_component = "speakerstats.meet.jitsi"
    conference_duration_component = "conferenceduration.meet.jitsi"

    c2s_require_encryption = false



VirtualHost "auth.meet.jitsi"
    ssl = {
        key = "/config/certs/auth.meet.jitsi.key";
        certificate = "/config/certs/auth.meet.jitsi.crt";
    }
    authentication = "internal_hashed"


VirtualHost "recorder.meet.jitsi"
    modules_enabled = {
      "ping";
    }
    authentication = "internal_hashed"


Component "internal-muc.meet.jitsi" "muc"
    storage = "memory"
    modules_enabled = {
        "ping";
        
    }
    muc_room_locking = false
    muc_room_default_public_jids = true

Component "muc.meet.jitsi" "muc"
    storage = "memory"
    modules_enabled = {
        "muc_meeting_id";
        
        
    }
    muc_room_cache_size = 1000
    muc_room_locking = false
    muc_room_default_public_jids = true

Component "focus.meet.jitsi"
    component_secret = "2c7e31cf18268403d8d41be96a770d8c"

Component "speakerstats.meet.jitsi" "speakerstats_component"
    muc_component = "muc.meet.jitsi"

Component "conferenceduration.meet.jitsi" "conference_duration_component"
    muc_component = "muc.meet.jitsi"


