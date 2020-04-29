它的作用是定义 IP 地址和 Host name(主机名)的映射关系

http://192.168.12.117/ http://local.data-stone.com/

- 网络上访问网站，要首先通过 DNS 服务器把要访问的网络域名（XXXX.com）解析成 XXX.XXX.XXX.XXX 的 IP 地址后，计算机才能对这个网络域名作访问。
- 可以通过利用 Hosts 文件中建立域名和 IP 的映射关系来达到目的。根据 Windows 系统规定，在进行 DNS 请求以前，Windows 系统会先检查自己的 Hosts 文件中是否有这个网络域名映射关系。如果有则，调用这个 IP 地址映射，如果没有，再向已知的 DNS 服务器提出域名解析。也就是说 Hosts 的请求级别比 DNS 高
