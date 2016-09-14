Vagrant.configure(2) do |config|

    # Image: Ubuntu 14.04 - Desktop
    config.vm.box = "box-cutter/ubuntu1404-desktop"
   
    # Configure resources
    config.vm.provider :virtualbox do |vb|
        vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
        vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
        vb.memory = 5096
    end
   
    # Mount volume
    config.vm.synced_folder ".", "/home/vagrant/mr_robot"

    # VM Provision
    config.vm.provision "shell", inline: <<-SHELL
        sudo apt-get update
    SHELL

    config.push.define "atlas" do |push|
        push.app = "amirbawab/mr_robot"
    end
end