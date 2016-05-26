from xml.dom import minidom
from geopy.distance import distance
import os, datetime, json

os.chdir('data')
runs = []
print 'progreso,ritmo,tipo'
for filename in os.listdir(os.getcwd()):

  e = minidom.parse(filename)
  run = {}
  total_time = 0
  total_distance = 0
  raw_points = []
  enriched_points = []

  for trkpt in e.getElementsByTagName('trkpt'):
    point = {}
    lon = float(trkpt.attributes['lon'].value)
    point['lon'] = float(trkpt.attributes['lon'].value)
    point['lat'] = float(trkpt.attributes['lat'].value)
    time = trkpt.getElementsByTagName('time')[0].firstChild.wholeText
    point['time'] = datetime.datetime.strptime(time, "%Y-%m-%dT%H:%M:%SZ")
    raw_points.append(point)

  for i in range(0, len(raw_points) - 1):
    enriched_point = {}
    current_point = raw_points[i]
    next_point = raw_points[i + 1]

    time_delta = (next_point['time'] - current_point['time']).total_seconds()
    total_time += time_delta
    mean_time = current_point['time'] + datetime.timedelta(0, time_delta/2)
    enriched_point['mean_time'] = mean_time
    
    current_position = (current_point['lat'], current_point['lon'])
    next_position = (next_point['lat'], next_point['lon'])
    dist = distance(current_position, next_position).meters
    total_distance += dist
    enriched_point['distance'] = dist
    enriched_point['acum_distance'] = total_distance
    enriched_point['time_delta'] = time_delta
    if time_delta != 0:
      enriched_point['speed'] = (dist/1000)/(time_delta/3600)
    else:
      enriched_point['speed'] = 0
    if (dist != 0):
      enriched_point['pace'] = (time_delta/60)/(dist/1000)
    else:
      enriched_point['pace'] = 0
    enriched_points.append(enriched_point)
  #for point in raw_points:
  #  point['time'] = point['time'].isoformat()
    
  #for point in enriched_points:
  #  point['mean_time'] = point['mean_time'].isoformat()

#  run['raw_points'] = raw_points
  run['enriched_points'] = enriched_points
  run['total_distance'] = total_distance
  run['total_distance_km'] = total_distance/1000.0
  run['total_time'] = total_time
  run['total_time_min'] = total_time/60.0
  run['avg_pace_min_km'] = (total_time/60)/(total_distance/1000)
  run['avg_speed_km/h'] = (total_distance/1000)/(total_time/3600)
#  print (total_distance/1000.0).__str__() + ',' + ((total_time/60)/(total_distance/1000)).__str__() + ',' + raw_points[0]['time'].year.__str__()

  runs.append(run)

normalized_pace_profiles = [{}, {}, {}]

for run in runs:
  total = run['total_distance']
  for point in run['enriched_points']:
    if total < 3000:
      cat = 1
    elif total < 6000:
      cat = 2
    else:
      cat = 3
    normalized_pace_profiles[cat - 1][int(point['acum_distance'] * 100 / total).__str__()] = point['pace']
i = 1
for profile in normalized_pace_profiles:
  for key in profile:
    print key, ',', profile[key], ',', i
  i += 1
#print(json.dumps(runs))
