module Sound.Tidal.Sumisonic.AbletonSync where

import Sound.Tidal.OscStream
import Sound.Tidal.Context

abletonSyncShape = Shape {
  params = [
    I "play" (Just 0),
    F "target" (Just 0),
    F "value" (Just 0),
    F "glide" (Just 0.0),
    F "curve" (Just 0.0)
  ],
  cpsStamp = True,
  latency = 0.33675
}

abletonSyncSlang = OscSlang {
  path = "/ableton_sync",
  timestamp = NoStamp,
  namedParams = True,
  preamble = []
}

abletonSyncStream port = do
  s <- makeConnection "127.0.0.1" port abletonSyncSlang
  stream (Backend s $ (\_ _ _ -> return ())) abletonSyncShape

play = makeI abletonSyncShape "play"
target = makeI abletonSyncShape "target"
value = makeF abletonSyncShape "value"
glide = makeF abletonSyncShape "glide"
curve = makeF abletonSyncShape "curve"
